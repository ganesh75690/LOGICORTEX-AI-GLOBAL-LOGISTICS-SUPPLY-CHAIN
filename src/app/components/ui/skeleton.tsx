import { motion } from 'motion/react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: boolean;
}

export const Skeleton = ({ 
  className = '', 
  variant = 'rectangular', 
  width, 
  height, 
  animation = true 
}: SkeletonProps) => {
  const baseClasses = 'bg-slate-700/50';
  
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded'
  };

  const style = {
    width: width || (variant === 'text' ? '100%' : '40px'),
    height: height || (variant === 'text' ? '16px' : '40px')
  };

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
      animate={animation ? {
        opacity: [0.5, 1, 0.5],
      } : undefined}
      transition={animation ? {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      } : undefined}
    />
  );
};

export const SkeletonTable = ({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) => {
  return (
    <div className="space-y-3">
      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
        <div className="grid grid-cols-4 gap-4 mb-4">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={`header-${i}`} variant="text" height="20px" />
          ))}
        </div>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={`row-${rowIndex}`} className="grid grid-cols-4 gap-4 py-2 border-t border-slate-700/50">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton key={`cell-${rowIndex}-${colIndex}`} variant="text" height="16px" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export const SkeletonCard = () => {
  return (
    <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center gap-4 mb-4">
        <Skeleton variant="circular" width={48} height={48} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="90%" />
      </div>
    </div>
  );
};

export const SkeletonLoader = ({ message = 'Loading...' }: { message?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-slate-700 border-t-[#00F5C4] rounded-full animate-spin" />
      </div>
      <p className="text-slate-400 text-sm">{message}</p>
    </div>
  );
};

export default Skeleton;