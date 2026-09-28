import React from 'react';
import { Star } from 'lucide-react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'rose' | 'green' | 'red' | 'blue' | 'gray';
  size?: 'sm' | 'md';
  className?: string;
}

const badgeVariants = {
  gold: 'bg-[#C9A227]/15 text-[#A8851E] border border-[#C9A227]/30',
  rose: 'bg-[#E6B8AF]/20 text-[#C9897A] border border-[#E6B8AF]/40',
  green: 'bg-green-100 text-green-700 border border-green-200',
  red: 'bg-red-100 text-red-700 border border-red-200',
  blue: 'bg-blue-100 text-blue-700 border border-blue-200',
  gray: 'bg-gray-100 text-gray-600 border border-gray-200',
};

const badgeSizes = {
  sm: 'text-xs px-2.5 py-0.5',
  md: 'text-sm px-3 py-1',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gold',
  size = 'sm',
  className = '',
}) => {
  return (
    <span
      className={`
        inline-flex items-center gap-1 font-medium rounded-full
        ${badgeVariants[variant]}
        ${badgeSizes[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

// ─── STAR RATING ──────────────────────────────────────────────────────────────
interface StarRatingProps {
  rating: number;
  max?: number;
  size?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  max = 5,
  size = 16,
  interactive = false,
  onChange,
}) => {
  const [hovered, setHovered] = React.useState(0);

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => {
        const filled = interactive ? (hovered || rating) > i : rating > i;
        return (
          <Star
            key={i}
            size={size}
            className={`transition-colors ${filled ? 'fill-[#C9A227] text-[#C9A227]' : 'text-gray-300'} ${interactive ? 'cursor-pointer' : ''}`}
            onMouseEnter={() => interactive && setHovered(i + 1)}
            onMouseLeave={() => interactive && setHovered(0)}
            onClick={() => interactive && onChange?.(i + 1)}
          />
        );
      })}
    </div>
  );
};

// ─── CARD ─────────────────────────────────────────────────────────────────────
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
  return (
    <div
      className={`
        bg-white rounded-2xl shadow-sm border border-gray-100
        ${hover ? 'hover:shadow-lg hover:-translate-y-1 transition-all duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

// ─── SECTION HEADING ──────────────────────────────────────────────────────────
interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  center = false,
  light = false,
}) => {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <div className="flex items-center gap-3 mb-3 justify-center">
          <div className="h-px w-8 bg-[#C9A227]" />
          <p className="text-[#C9A227] font-semibold text-sm tracking-widest uppercase">
            {eyebrow}
          </p>
          <div className="h-px w-8 bg-[#C9A227]" />
        </div>
      )}
      <h2
        className={`font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4
          ${light ? 'text-white' : 'text-[#1F2937]'}
        `}
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base md:text-lg leading-relaxed ${light ? 'text-gray-300' : 'text-gray-500'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

// ─── DIVIDER ──────────────────────────────────────────────────────────────────
export const GoldDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`divider-gold w-full ${className}`} />
);

// ─── LOADER ───────────────────────────────────────────────────────────────────
export const PageLoader: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-[#C9A227]/20 border-t-[#C9A227] rounded-full animate-spin mx-auto mb-4" />
      <p className="text-[#C9A227] font-medium">Loading Lumina...</p>
    </div>
  </div>
);

// ─── EMPTY STATE ──────────────────────────────────────────────────────────────
interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    {icon && <div className="text-gray-300 mb-4">{icon}</div>}
    <h3 className="text-lg font-semibold text-gray-600 mb-2">{title}</h3>
    {description && <p className="text-gray-400 text-sm max-w-xs">{description}</p>}
    {action && <div className="mt-6">{action}</div>}
  </div>
);

// ─── MODAL ────────────────────────────────────────────────────────────────────
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const modalSizes = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
};

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  React.useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="modal-backdrop absolute inset-0" onClick={onClose} />
      <div
        className={`relative w-full ${modalSizes[size]} bg-white rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200`}
      >
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-[#1F2937]" style={{ fontFamily: "'Playfair Display', serif" }}>
              {title}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};
