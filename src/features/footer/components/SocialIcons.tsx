import { useState } from "react";
import { socialIcons } from "../footer-data";

export default function SocialIcons() {
  // Lưu trạng thái hover của từng icon
  const [hovered, setHovered] = useState<string | null>(null);

  const getIconSVG = (iconName: string, isHover: boolean) => {
    switch (iconName) {
      case "facebook":
        return <img src={isHover ? "/social-icon/facebook-hover.svg" : "/social-icon/facebook.svg"} alt="facebook" />;
      case "instagram":
        return <img src={isHover ? "/social-icon/insta-hover.svg" : "/social-icon/insta.svg"} alt="instagram" />;
      case "pinterest":
        return <img src={isHover ? "/social-icon/pinterest-hover.svg" : "/social-icon/pinterest.svg"} alt="pinterest" />;
      case "youtube":
        return <img src={isHover ? "/social-icon/youtube-hover.svg" : "/social-icon/youtube.svg"} alt="youtube" />;
      case "twitter":
        return <img src={isHover ? "/social-icon/twitter-hover.svg" : "/social-icon/twitter.svg"} alt="twitter" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-neutral-700 text-lg font-semibold">FOLLOW US</h3>
      <div className="flex gap-3">
        {socialIcons.map((social, index) => (
          <a
            key={index}
            href={social.href}
            className="w-10 h-10 flex items-center justify-center transition-opacity"
            aria-label={social.name}
            onMouseEnter={() => setHovered(social.icon)}
            onMouseLeave={() => setHovered(null)}
          >
            {getIconSVG(social.icon, hovered === social.icon)}
          </a>
        ))}
      </div>
    </div>
  );
};

