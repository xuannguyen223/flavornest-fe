import type { FooterColumn } from "../footer-data";

export interface FooterLinksProps {
  columns: FooterColumn[];
}

export default function FooterLinks({columns}: FooterLinksProps) {
  return (
    <div className="flex flex-wrap gap-20">
      {columns.map((column, idx) => (
        <div key={idx} className="flex flex-col gap-5">
          {/* Title */}
          <h3 className="text-neutral-700 text-base font-bold leading-tight">
            {column.title}
          </h3>

          {/* Links */}
          <div className="flex flex-col gap-2 text-sm">
            {(column.links || []).map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-neutral-400 hover:text-neutral-700 
                           transition-colors font-poppins"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
