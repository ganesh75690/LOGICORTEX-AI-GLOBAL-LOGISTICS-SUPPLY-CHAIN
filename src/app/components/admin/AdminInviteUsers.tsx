import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  UserPlus, 
  Phone, 
  Mail, 
  MapPin, 
  Warehouse, 
  Copy, 
  Share2, 
  CheckCircle, 
  Clock, 
  XCircle,
  Truck,
  Building,
  Link,
  Send,
  ArrowRight,
  User
} from 'lucide-react';

interface Invite {
  id: string;
  orgId: string;
  role: 'supplier';
  name: string;
  contactPerson: string;
  contact: string;
  contactNumber: string;
  contactAddress: string;
  country: string;
  token: string;
  status: 'pending' | 'joined' | 'expired';
  createdAt: Date;
  inviteLink: string;
}

export function AdminInviteUsers() {
  const [showInvitePopup, setShowInvitePopup] = useState(false);
  const [generatedInvite, setGeneratedInvite] = useState<Invite | null>(null);
  const [pendingInvites, setPendingInvites] = useState<Invite[]>([
    {
      id: '2',
      orgId: 'ORG-7842',
      role: 'supplier',
      name: 'Global Logistics Ltd',
      contactPerson: 'John Smith',
      contact: 'supplier@company.com',
      contactNumber: '+91 98765 43210',
      contactAddress: '456 Business Park, Delhi, Delhi 110001',
      country: 'India',
      token: 'def456',
      status: 'joined',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      inviteLink: 'https://app.com/invite?org=ORG-7842&role=supplier&token=def456'
    }
  ]);

  const [inviteForm, setInviteForm] = useState({
    role: 'supplier',
    name: '',
    contactPerson: '',
    contact: '',
    contactNumber: '',
    contactAddress: '',
    country: '',
    region: '',
    warehouse: ''
  });

  const generateToken = () => {
    return Math.random().toString(36).substring(2, 8);
  };

  const generateInviteLink = (role: string, token: string) => {
    return `https://app.com/invite?org=ORG-7842&role=${role}&token=${token}`;
  };

  const handleGenerateInvite = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inviteForm.role || !inviteForm.name || !inviteForm.contactPerson || !inviteForm.contact || !inviteForm.contactNumber || !inviteForm.country) {
      return;
    }

    const token = generateToken();
    const inviteLink = generateInviteLink(inviteForm.role, token);
    
    const newInvite: Invite = {
      id: Date.now().toString(),
      orgId: 'ORG-7842',
      role: 'supplier',
      name: inviteForm.name,
      contactPerson: inviteForm.contactPerson,
      contact: inviteForm.contact,
      contactNumber: inviteForm.contactNumber,
      contactAddress: inviteForm.contactAddress,
      country: inviteForm.country,
      token,
      status: 'pending',
      createdAt: new Date(),
      inviteLink
    };

    setGeneratedInvite(newInvite);
    setPendingInvites(prev => [newInvite, ...prev]);
    setShowInvitePopup(true);
    
    // Reset form
    setInviteForm({
      role: 'supplier',
      name: '',
      contactPerson: '',
      contact: '',
      contactNumber: '',
      contactAddress: '',
      country: '',
      region: '',
      warehouse: ''
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'joined':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'expired':
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'joined':
        return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'expired':
        return 'text-red-400 bg-red-400/20 border-red-400/30';
      default:
        return 'text-slate-400 bg-slate-400/20 border-slate-400/30';
    }
  };

  const getRoleIcon = (role: string) => {
    return <Building className="w-4 h-4" />;
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Invite Users</h1>
          <p className="text-slate-300">Manage team invitations and track onboarding status</p>
        </div>

        {/* Invite Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Invite New User Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50"
          >
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              Invite New User
            </h2>

            <form onSubmit={handleGenerateInvite} className="space-y-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Building className="w-4 h-4 inline mr-2" />
                  Supplier Information
                </label>
              </div>

              {/* Company Name Field */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Building className="w-4 h-4 inline mr-2" />
                  Company Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={inviteForm.name}
                  onChange={(e) => setInviteForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Acme Supplies"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Contact Person Field */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Contact Person Name
                </label>
                <input
                  id="contactPerson"
                  type="text"
                  value={inviteForm.contactPerson || ''}
                  onChange={(e) => setInviteForm(prev => ({ ...prev, contactPerson: e.target.value }))}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Contact Number Field */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Contact Number
                </label>
                <input
                  id="contactNumber"
                  type="tel"
                  value={inviteForm.contactNumber || ''}
                  onChange={(e) => setInviteForm(prev => ({ ...prev, contactNumber: e.target.value }))}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Contact Info */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={inviteForm.contact}
                  onChange={(e) => setInviteForm(prev => ({ ...prev, contact: e.target.value }))}
                  placeholder="supplier@company.com"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Contact Address */}
              <div>
                <label htmlFor="contactAddress" className="block text-sm font-medium text-slate-300 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Contact Address
                </label>
                <input
                  id="contactAddress"
                  type="text"
                  value={inviteForm.contactAddress}
                  onChange={(e) => setInviteForm(prev => ({ ...prev, contactAddress: e.target.value }))}
                  placeholder="123 Main St, City, State 123456"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Country Field */}
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-slate-300 mb-2">
                  <Building className="w-4 h-4 inline mr-2" />
                  Country
                </label>
                <select
                  id="country"
                  value={inviteForm.country}
                  onChange={(e) => setInviteForm(prev => ({ ...prev, country: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="GB">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="AU">Australia</option>
                  <option value="IN">India</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="JP">Japan</option>
                  <option value="CN">China</option>
                  <option value="SG">Singapore</option>
                  <option value="AE">United Arab Emirates</option>
                  <option value="BR">Brazil</option>
                  <option value="MX">Mexico</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              {/* Optional Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Region (Optional)
                  </label>
                  <input
                    type="text"
                    value={inviteForm.region}
                    onChange={(e) => setInviteForm(prev => ({ ...prev, region: e.target.value }))}
                    placeholder="North Region"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Warehouse className="w-4 h-4 inline mr-2" />
                    Warehouse (Optional)
                  </label>
                  <input
                    type="text"
                    value={inviteForm.warehouse}
                    onChange={(e) => setInviteForm(prev => ({ ...prev, warehouse: e.target.value }))}
                    placeholder="Warehouse A"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                Generate Invite
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </motion.div>

          {/* Pending Invites */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Pending Invites</h2>
            
            <div className="space-y-3">
              {pendingInvites.map((invite) => (
                <div
                  key={invite.id}
                  className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getRoleIcon(invite.role)}
                      <div>
                        <div className="text-white font-medium">{invite.name}</div>
                        <div className="text-slate-400 text-sm">{invite.contactPerson} • {invite.contact} • {invite.contactNumber}</div>
                        <div className="text-slate-500 text-xs mt-1">{invite.contactAddress}, {invite.country}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${getStatusColor(invite.status)}`}>
                          {getStatusIcon(invite.status)}
                          <span className="capitalize">{invite.status}</span>
                        </div>
                        <div className="text-slate-500 text-xs mt-1">{formatTimeAgo(invite.createdAt)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Invite Generated Popup */}
        {showInvitePopup && generatedInvite && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowInvitePopup(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl p-8 border border-green-500/30 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Invite Generated</h3>
                <p className="text-slate-300">
                  Email will be sent to {generatedInvite.contact}
                </p>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Link className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-400">Invite Link</span>
                </div>
                <div className="bg-slate-900/50 rounded p-3 font-mono text-xs text-green-400 break-all">
                  {generatedInvite.inviteLink}
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => copyToClipboard(generatedInvite.inviteLink)}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 text-white font-semibold rounded-lg hover:bg-slate-700/50 transition-colors flex items-center justify-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy Link
                </button>
                
                <div className="grid grid-cols-1 gap-3">
                  <button
                    className="px-4 py-3 bg-blue-500/20 border border-blue-500/30 text-blue-400 font-semibold rounded-lg hover:bg-blue-500/30 transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Send Email
                  </button>
                </div>
                
                <button
                  onClick={() => setShowInvitePopup(false)}
                  className="w-full px-4 py-3 bg-green-500/20 border border-green-500/30 text-green-400 font-semibold rounded-lg hover:bg-green-500/30 transition-colors"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
