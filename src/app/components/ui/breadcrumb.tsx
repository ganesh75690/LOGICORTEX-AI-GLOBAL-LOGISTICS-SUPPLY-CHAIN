import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="flex items-center space-x-2 text-sm">
      <Home className="w-4 h-4 text-slate-400" />
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          {index > 0 && <ChevronRight className="w-4 h-4 text-slate-600" />}
          {item.href ? (
            <a
              href={item.href}
              className="text-slate-400 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ) : (
            <button
              onClick={item.onClick}
              className={`${
                index === items.length - 1
                  ? 'text-white font-medium'
                  : 'text-slate-400 hover:text-white transition-colors'
              }`}
            >
              {item.label}
            </button>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;