import { useState } from "react";
import { motion } from "framer-motion";

interface TeamMemberCardProps {
  name: string;
  role: string;
  image: string;
  linkedinUrl: string;
  bio?: string;
  delay?: number;
}

const LinkedInIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const TeamMemberCard = ({
  name,
  role,
  image,
  linkedinUrl,
  bio = "Passionate about AI education and empowering learners to achieve their goals.",
  delay = 0,
}: TeamMemberCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className="relative w-full h-[380px] transition-transform duration-700 preserve-3d cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 backface-hidden rounded-xl overflow-hidden border-2 border-accent/20 bg-card shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="relative h-[240px] overflow-hidden">
            <img
              src={image}
              alt={`${name} - ${role} at FaxLab AI`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="p-5 text-center space-y-2">
            <h3 className="text-lg font-bold text-foreground truncate">{name}</h3>
            <p className="text-accent font-semibold text-sm">{role}</p>
            <p className="text-xs text-muted-foreground">Hover to see more</p>
          </div>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 backface-hidden rounded-xl overflow-hidden border-2 border-accent/30 bg-gradient-to-br from-primary to-secondary shadow-xl flex flex-col justify-center items-center p-6 text-center"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isFlipped ? 1 : 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-accent mx-auto ring-4 ring-accent/30">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary-foreground">{name}</h3>
              <p className="text-accent font-semibold">{role}</p>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              {bio}
            </p>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-foreground rounded-lg hover:bg-accent-glow transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-accent/40"
              onClick={(e) => e.stopPropagation()}
            >
              <LinkedInIcon />
              Connect on LinkedIn
            </a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default TeamMemberCard;
