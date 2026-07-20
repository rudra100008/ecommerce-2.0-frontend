"use client";
import { motion, type Variants } from "framer-motion";

const draw = (delay: number, duration: number = 0.8): Variants => ({
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        delay,
        duration,
        ease: [0.4, 0, 0.2, 1],
      },
      opacity: {
        delay,
        duration: 0.01,
      },
    },
  },
});

const fadeUp = (delay: number): Variants => ({
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.6,
      ease: "easeOut",
    },
  },
});
const wheel = (delay: number, duration: number = 0.8): Variants => ({
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      scale: {
        delay,
        duration,
        ease: [0.4, 0, 0.2, 1],
      },
      opacity: {
        delay,
        duration: 0.01,
      },
    },
  },
});

export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <div
        className="absolute w-32 h-32 rounded-full"
        style={{
          background: "radial-gradient(circle, #f9731620 0%, transparent 70%)",
        }}
      />
      {/*
        motion.svg — the parent SVG element
        
        initial="hidden"  → all children START in the "hidden" variant state
        animate="visible" → all children ANIMATE TO the "visible" variant state
        
        This is called VARIANT PROPAGATION — you set initial/animate ONCE
        on the parent, and every child motion.* element that has matching
        variant names ("hidden"/"visible") will automatically inherit it.
        You don't repeat initial/animate on each child.
      */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          delay: 2, // starts after draw animation finishes
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="140"
          height="140"
          viewBox="0 0 24 24"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial="hidden"
          animate="visible"
          whileInView="visible"
        >
          {/* <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /> */}

          {/*
          motion.path — the cart body (the big path in your SVG)
          
          d="..."        → the actual path data you copied from Lucide
                           M = moveto, h = horizontal line, l = line,
                           a = arc, H = horizontal line (absolute)
          
          stroke         → color of the line being drawn
          strokeWidth    → thickness (Lucide default is 2, bump up for loading screens)
          
          variants={draw(0.1)}
          → uses the draw() function with delay = 0.1 seconds
          → so: wait 0.1s, then draw this path over 0.8s
          
          NOTE: no initial/animate needed here — inherited from parent svg
        */}
          <motion.path
            d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"
            stroke="#f97316"
            strokeWidth="2"
            variants={draw(0.1, 1.2)}
          />

          {/* Tick — draws after cart body */}
          <motion.path
            d="M11  11 L12 13  L16  10"
            stroke="#f97316"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={draw(1.2, 0.4)}
          />

          {/*
          motion.circle — left wheel
          
          cx, cy  → center x and y position
          r       → radius
          
          For circles, pathLength still works the same way
          It draws the circle starting from the rightmost point, going clockwise
          
          variants={draw(1.1)}
          → starts AFTER the cart body finishes drawing
          → delay 1.1s = roughly when the body animation ends (0.1 delay + ~1s draw)
        */}
          {/* Left wheel — made visible by adding a spoke */}
          <motion.g
            style={{ transformOrigin: "8px 21px" }}
            animate={{ rotate: 360 }}
            transition={{
              delay: 2.2,
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <motion.circle
              cx="8"
              cy="21"
              r="1.6"
              stroke="#f97316"
              strokeWidth="1"
              fill="none"
              variants={wheel(1.5, 0.4)}
            />
          </motion.g>
          {/* Right wheel  */}
          <motion.g
            style={{ transformOrigin: "19px 21px" }}
            animate={{ rotate: 360 }}
            transition={{
              delay: 2.2,
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <motion.circle
              cx="19"
              cy="21"
              r="1.6"
              stroke="#f97316"
              strokeWidth="1"
              fill="none"
              variants={wheel(1.7, 0.4)}
            />
          </motion.g>
        </motion.svg>
      </motion.div>

      <motion.div
        className="flex items-baseline mt-4 "
        variants={fadeUp(1.7)}
        initial="hidden"
        animate="visible"
      >
        <span className="text-3xl font-medium text-gray-900 tracking-tight">
          Shop
        </span>
        <span className="text-3xl font-medium tracking-tight text-accent">
          Ease
        </span>
      </motion.div>

      <motion.p
        className="text-xs text-gray-400 tracking-widest uppercase mt-2"
        variants={fadeUp(2.0)}
        initial="hidden"
        animate="visible"
      >
        shop smarter, live better
      </motion.p>

      {/*
        Loading dots — infinite pulse animation
        These use animate directly (not variants) because they loop forever
        
        animate={{ scale: [...], opacity: [...] }}
        → keyframe array syntax
        → [0.8, 1.3, 0.8] means: start small → grow → shrink → repeat
        
        transition.repeat: Infinity → loops forever
        transition.delay    → each dot starts slightly later = stagger effect
      */}

      <motion.div
        className="flex gap-2 mt-6"
        variants={fadeUp(2.0)}
        initial="hidden"
        animate="visible"
      >
        {[0, 0.15, 0.3].map((delay, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-accent"
            animate={{
              scale: [0.8, 1.3, 0.8],
              opacity: [0.3, 1.0, 0.3],
            }}
            transition={{
              delay,
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
