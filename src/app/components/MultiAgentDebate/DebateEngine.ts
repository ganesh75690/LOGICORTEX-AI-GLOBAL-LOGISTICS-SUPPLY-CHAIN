import {
  Debate,
  DebateMessage,
  AgentAnalysis,
  AgentChallenge,
  ConsensusResult,
  DebateStatus,
  AgentType
} from '../../types/multiAgentDebate';
import { BaseAgent, AgentFactory } from './Agent';

/**
 * Debate Coordination Engine
 * Orchestrates multi-agent debates, manages agent interactions, and builds consensus
 */
export class DebateEngine {
  private agents: Map<string, BaseAgent>;
  private currentDebate: Debate | null;
  private debateHistory: Debate[];
  private messageQueue: DebateMessage[];
  private isProcessing: boolean;

  constructor() {
    this.agents = new Map();
    this.currentDebate = null;
    this.debateHistory = [];
    this.messageQueue = [];
    this.isProcessing = false;
    this.initializeAgents();
  }

  /**
   * Initialize all AI agents
   */
  private initializeAgents(): void {
    const allAgents = AgentFactory.createAllAgents();
    allAgents.forEach(agent => {
      this.agents.set(agent.getAgent().id, agent);
    });
  }

  /**
   * Start a new debate
   */
  async startDebate(problem: any): Promise<Debate> {
    const debate: Debate = {
      id: `debate_${Date.now()}`,
      title: problem.title || 'Supply Chain Decision Analysis',
      description: problem.description || 'Multi-agent analysis of supply chain optimization opportunities',
      problem: {
        category: problem.category || 'optimization',
        severity: problem.severity || 'medium',
        context: problem.context || 'General supply chain optimization',
        stakeholders: problem.stakeholders || ['operations', 'finance', 'customers'],
        timeline: {
          deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
          milestones: problem.milestones || []
        }
      },
      status: 'active',
      createdAt: new Date(),
      startedAt: new Date(),
      participants: Array.from(this.agents.values()).map(agent => agent.getAgent()),
      messages: [],
      voting: {
        votes: [],
        consensus: {
          finalRecommendation: '',
          consensusScore: 0,
          agreementLevel: 'no-consensus',
          participatingAgents: 0,
          totalAgents: this.agents.size
        }
      }
    };

    this.currentDebate = debate;
    await this.runDebatePhase();
    return debate;
  }

  /**
   * Run the debate phase where agents analyze and discuss
   */
  private async runDebatePhase(): Promise<void> {
    this.isProcessing = true;

    // Phase 1: Individual Analysis
    await this.runAnalysisPhase();

    // Phase 2: Agent Challenges
    await this.runChallengePhase();

    // Phase 3: Discussion and Refinement
    await this.runDiscussionPhase();

    // Phase 4: Voting and Consensus
    await this.runVotingPhase();

    this.isProcessing = false;
  }

  /**
   * Phase 1: Individual Analysis by all agents
   */
  private async runAnalysisPhase(): Promise<void> {
    if (!this.currentDebate) return;

    const analyses: AgentAnalysis[] = [];

    for (const [agentId, agent] of this.agents) {
      try {
        const analysis = await agent.analyze(this.currentDebate.problem);
        analyses.push(analysis);

        // Add analysis message to debate
        const message: DebateMessage = {
          id: `msg_${Date.now()}_${agentId}`,
          debateId: this.currentDebate.id,
          agentId,
          agentType: agent.getAgent().type,
          timestamp: new Date(),
          messageType: 'analysis',
          content: {
            message: `${agent.getAgent().name} completed analysis`,
            data: analysis
          },
          confidence: analysis.confidence
        };

        this.currentDebate.messages.push(message);
      } catch (error) {
        console.error(`Error in analysis by ${agentId}:`, error);
      }
    }

    // Add brief delay between analyses
    await this.delay(500);
  }

  /**
   * Phase 2: Agents challenge each other's analyses
   */
  private async runChallengePhase(): Promise<void> {
    if (!this.currentDebate) return;

    const analyses = this.currentDebate.messages
      .filter(msg => msg.messageType === 'analysis')
      .map(msg => msg.content.data as AgentAnalysis);

    // Generate challenges between agents
    for (let i = 0; i < analyses.length; i++) {
      for (let j = i + 1; j < analyses.length; j++) {
        const challenger = analyses[i];
        const challenged = analyses[j];

        // Skip if agents have similar perspectives
        if (this.shouldChallenge(challenger, challenged)) {
          const challenge = await this.generateChallenge(challenger, challenged);
          
          const message: DebateMessage = {
            id: `msg_${Date.now()}_challenge_${i}_${j}`,
            debateId: this.currentDebate.id,
            agentId: challenger.agentId,
            agentType: challenger.agentType,
            timestamp: new Date(),
            messageType: 'challenge',
            content: {
              message: `${challenger.agentType} challenges ${challenged.agentType}`,
              data: challenge
            },
            confidence: challenger.confidence,
            metadata: {
              challengedAgentId: challenged.agentId,
              challengedAgentType: challenged.agentType
            }
          };

          this.currentDebate.messages.push(message);

          // Generate response
          const response = await this.generateResponse(challenge, challenged);
          
          const responseMessage: DebateMessage = {
            id: `msg_${Date.now()}_response_${i}_${j}`,
            debateId: this.currentDebate.id,
            agentId: challenged.agentId,
            agentType: challenged.agentType,
            timestamp: new Date(),
            messageType: 'response',
            content: {
              message: `${challenged.agentType} responds to challenge`,
              data: response,
              referencedMessageId: message.id
            },
            confidence: challenged.confidence
          };

          this.currentDebate.messages.push(responseMessage);
        }
      }
    }
  }

  /**
   * Determine if one agent should challenge another
   */
  private shouldChallenge(challenger: AgentAnalysis, challenged: AgentAnalysis): boolean {
    // Challenge if confidence difference is significant
    const confidenceDiff = Math.abs(challenger.confidence - challenged.confidence);
    if (confidenceDiff > 15) return true;

    // Challenge if risk assessments differ significantly
    const challengerRisk = challenger.analysis.risks.reduce((sum, r) => sum + r.probability, 0);
    const challengedRisk = challenged.analysis.risks.reduce((sum, r) => sum + r.probability, 0);
    if (Math.abs(challengerRisk - challengedRisk) > 0.3) return true;

    // Random challenge for diversity
    return Math.random() > 0.7;
  }

  /**
   * Generate a challenge from one agent to another
   */
  private async generateChallenge(challenger: AgentAnalysis, challenged: AgentAnalysis): Promise<AgentChallenge> {
    const challengePoints = [
      `Your recommendation doesn't adequately address ${challenged.analysis.risks[0]?.type || 'key risks'}`,
      `The cost estimate seems optimistic given current market conditions`,
      `Your environmental impact assessment may be understated`,
      `The proposed timeline may not account for implementation complexity`,
      `Alternative approaches might yield better risk-adjusted returns`
    ];

    const challenge: AgentChallenge = {
      id: `challenge_${Date.now()}`,
      challengerId: challenger.agentId,
      challengedAgentId: challenged.agentId,
      targetAnalysisId: 'analysis_' + challenged.agentId,
      timestamp: new Date(),
      challenge: {
        point: challengePoints[Math.floor(Math.random() * challengePoints.length)],
        counterArgument: challenger.recommendation.rationale,
        evidence: challenger.supportingEvidence.dataPoints.slice(0, 2),
        suggestedAlternative: 'Consider integrating additional risk mitigation measures'
      },
      resolved: false
    };

    return challenge;
  }

  /**
   * Generate a response to a challenge
   */
  private async generateResponse(challenge: AgentChallenge, challengedAgent: AgentAnalysis): Promise<any> {
    const response = {
      rebuttal: 'I acknowledge the concern and will incorporate additional risk mitigation measures',
      acknowledgment: 'Valid point about the complexity factors',
      revisedRecommendation: 'Adjust timeline by 15% and add contingency budget of 10%'
    };

    return response;
  }

  /**
   * Phase 3: Discussion and refinement
   */
  private async runDiscussionPhase(): Promise<void> {
    if (!this.currentDebate) return;

    // Add discussion messages
    const discussionTopics = [
      'Cost-benefit analysis across all recommendations',
      'Integration challenges and dependencies',
      'Resource allocation and prioritization',
      'Implementation timeline coordination',
      'Risk mitigation strategies'
    ];

    for (const topic of discussionTopics) {
      const randomAgent = Array.from(this.agents.values())[Math.floor(Math.random() * this.agents.size)];
      
      const message: DebateMessage = {
        id: `msg_${Date.now()}_discussion_${topic.replace(/\s/g, '_')}`,
        debateId: this.currentDebate.id,
        agentId: randomAgent.getAgent().id,
        agentType: randomAgent.getAgent().type,
        timestamp: new Date(),
        messageType: 'comment',
        content: {
          message: `Discussion point: ${topic}`,
          data: { topic, insights: this.generateDiscussionInsights(topic) }
        },
        confidence: 70 + Math.random() * 20
      };

      this.currentDebate.messages.push(message);
      await this.delay(300);
    }
  }

  /**
   * Generate insights for discussion topics
   */
  private generateDiscussionInsights(topic: string): string[] {
    const insights = {
      'Cost-benefit analysis': [
        'ROI varies significantly across recommendations',
        'Short-term costs vs long-term benefits trade-off',
        'Implementation costs may be underestimated'
      ],
      'Integration challenges': [
        'System compatibility concerns',
        'Data integration complexity',
        'Stakeholder alignment requirements'
      ],
      'Resource allocation': [
        'Budget constraints may limit simultaneous implementation',
        'Technical expertise availability varies',
        'Timeline conflicts between initiatives'
      ],
      'Implementation timeline': [
        'Phased implementation recommended',
        'Critical path dependencies identified',
        'Buffer time needed for unexpected delays'
      ],
      'Risk mitigation': [
        'Multiple layers of risk mitigation required',
        'Contingency planning essential',
        'Monitoring and adjustment mechanisms needed'
      ]
    };

    return insights[topic] || ['General discussion insights'];
  }

  /**
   * Phase 4: Voting and consensus building
   */
  private async runVotingPhase(): Promise<void> {
    if (!this.currentDebate) return;

    // Simulate voting process
    const analyses = this.currentDebate.messages
      .filter(msg => msg.messageType === 'analysis')
      .map(msg => msg.content.data as AgentAnalysis);

    // Each agent votes on recommendations
    for (const analysis of analyses) {
      const vote = {
        agentId: analysis.agentId,
        recommendationId: analysis.recommendation.action,
        weight: this.agents.get(analysis.agentId)?.getAgent().weight || 1.0,
        timestamp: new Date()
      };

      this.currentDebate.voting.votes.push(vote);

      const voteMessage: DebateMessage = {
        id: `msg_${Date.now()}_vote_${analysis.agentId}`,
        debateId: this.currentDebate.id,
        agentId: analysis.agentId,
        agentType: analysis.agentType,
        timestamp: new Date(),
        messageType: 'vote',
        content: {
          message: `${analysis.agentType} votes for: ${analysis.recommendation.action}`,
          data: vote
        },
        confidence: analysis.confidence
      };

      this.currentDebate.messages.push(voteMessage);
    }

    // Calculate consensus
    const consensus = this.calculateConsensus();
    this.currentDebate.voting.consensus = consensus;

    // Add consensus message
    const consensusMessage: DebateMessage = {
      id: `msg_${Date.now()}_consensus`,
      debateId: this.currentDebate.id,
      agentId: 'system',
      agentType: 'operations', // Use operations as synthesizer
      timestamp: new Date(),
      messageType: 'consensus',
      content: {
        message: `Consensus reached: ${consensus.finalRecommendation}`,
        data: consensus
      },
      confidence: consensus.consensusScore
    };

    this.currentDebate.messages.push(consensusMessage);
    this.currentDebate.status = 'completed';
    this.currentDebate.completedAt = new Date();

    // Create final decision
    this.currentDebate.decision = this.createFinalDecision(consensus);

    // Add to history
    this.debateHistory.push(this.currentDebate);
  }

  /**
   * Calculate consensus from votes
   */
  private calculateConsensus(): any {
    const votes = this.currentDebate?.voting.votes || [];
    
    if (votes.length === 0) {
      return {
        finalRecommendation: 'No consensus reached',
        consensusScore: 0,
        agreementLevel: 'no-consensus',
        participatingAgents: 0,
        totalAgents: this.agents.size
      };
    }

    // Count votes by recommendation
    const voteCounts = new Map<string, number>();
    const voteWeights = new Map<string, number>();

    votes.forEach(vote => {
      const count = voteCounts.get(vote.recommendationId) || 0;
      const weight = voteWeights.get(vote.recommendationId) || 0;
      voteCounts.set(vote.recommendationId, count + 1);
      voteWeights.set(vote.recommendationId, weight + vote.weight);
    });

    // Find winner
    let maxWeight = 0;
    let winner = '';
    voteWeights.forEach((weight, recommendation) => {
      if (weight > maxWeight) {
        maxWeight = weight;
        winner = recommendation;
      }
    });

    // Calculate consensus score
    const totalWeight = Array.from(voteWeights.values()).reduce((sum, w) => sum + w, 0);
    const consensusScore = totalWeight > 0 ? (maxWeight / totalWeight) * 100 : 0;

    // Determine agreement level
    let agreementLevel: 'unanimous' | 'majority' | 'split' | 'no-consensus';
    if (voteCounts.size === 1 && voteCounts.get(winner) === votes.length) {
      agreementLevel = 'unanimous';
    } else if (consensusScore >= 70) {
      agreementLevel = 'majority';
    } else if (consensusScore >= 50) {
      agreementLevel = 'split';
    } else {
      agreementLevel = 'no-consensus';
    }

    return {
      finalRecommendation: winner,
      consensusScore,
      agreementLevel,
      participatingAgents: votes.length,
      totalAgents: this.agents.size
    };
  }

  /**
   * Create final decision from consensus
   */
  private createFinalDecision(consensus: any): any {
    const analyses = this.currentDebate?.messages
      .filter(msg => msg.messageType === 'analysis')
      .map(msg => msg.content.data as AgentAnalysis) || [];

    // Find the analysis that matches the consensus recommendation
    const winningAnalysis = analyses.find(a => a.recommendation.action === consensus.finalRecommendation);

    return {
      finalDecision: consensus.finalRecommendation,
      implementationPlan: winningAnalysis?.recommendation.rationale || 'Implementation based on consensus',
      responsibleAgents: analyses.map(a => a.agentId),
      successMetrics: [
        'Cost reduction target',
        'Efficiency improvement target',
        'Risk mitigation target',
        'Timeline adherence'
      ],
      estimatedImpact: {
        financial: winningAnalysis?.recommendation.estimatedCost || 0,
        operational: winningAnalysis?.recommendation.estimatedTime || 0,
        environmental: winningAnalysis?.recommendation.environmentalImpact?.sustainabilityScore || 0
      }
    };
  }

  /**
   * Get current debate status
   */
  getCurrentDebate(): Debate | null {
    return this.currentDebate;
  }

  /**
   * Get debate history
   */
  getDebateHistory(): Debate[] {
    return this.debateHistory;
  }

  /**
   * Get all agents
   */
  getAgents(): BaseAgent[] {
    return Array.from(this.agents.values());
  }

  /**
   * Get debate analytics
   */
  getAnalytics(): any {
    const totalDebates = this.debateHistory.length;
    const averageConsensusScore = totalDebates > 0
      ? this.debateHistory.reduce((sum, d) => sum + d.voting.consensus.consensusScore, 0) / totalDebates
      : 0;

    const agentPerformance = Array.from(this.agents.values()).map(agent => {
      const agentInfo = agent.getAgent();
      return {
        agentId: agentInfo.id,
        agentType: agentInfo.type,
        participationRate: 100, // All agents participate in every debate
        averageConfidence: agentInfo.confidence,
        successRate: 85 + Math.random() * 10, // Mock calculation
        influenceScore: agentInfo.weight * 10
      };
    });

    return {
      totalDebates,
      averageConsensusScore,
      agentPerformance,
      consensusTrends: [],
      decisionEffectiveness: []
    };
  }

  /**
   * Pause current debate
   */
  pauseDebate(): void {
    if (this.currentDebate) {
      this.currentDebate.status = 'paused';
    }
  }

  /**
   * Resume paused debate
   */
  resumeDebate(): void {
    if (this.currentDebate && this.currentDebate.status === 'paused') {
      this.currentDebate.status = 'active';
      this.runDebatePhase();
    }
  }

  /**
   * Cancel current debate
   */
  cancelDebate(): void {
    this.currentDebate = null;
    this.isProcessing = false;
  }

  /**
   * Utility delay function
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
