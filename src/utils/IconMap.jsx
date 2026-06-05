import { 
  FaCode, FaLaptopCode, FaMobileAlt, FaDatabase, FaServer, FaDesktop, FaPenNib, 
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGithub, FaAws, FaDocker, FaPython,
  FaFigma, FaApple, FaAndroid, FaGlobe, FaSearch, FaRocket, FaLightbulb, FaCogs,
  FaPaintBrush, FaRobot, FaShoppingCart, FaChartLine, FaShieldAlt
} from 'react-icons/fa';

import { 
  SiJavascript, SiTypescript, SiTailwindcss, SiMongodb, SiNextdotjs, SiFramer, 
  SiVite, SiExpress, SiFirebase, SiPostgresql, SiGraphql, SiRedux, SiVuedotjs,
  SiAngular, SiDjango, SiLaravel, SiWordpress, SiShopify,
  SiVercel, SiGit
} from 'react-icons/si';

import { 
  Monitor, ShoppingCart, Layout, Smartphone, PenTool, TrendingUp, ArrowRight, 
  Play, Globe, Cpu, Layers, Code, Zap, Database, Server
} from 'lucide-react';

export const IconMap = {
  // FontAwesome
  FaCode, FaLaptopCode, FaMobileAlt, FaDatabase, FaServer, FaDesktop, FaPenNib,
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGithub, FaAws, FaDocker, FaPython,
  FaFigma, FaApple, FaAndroid, FaGlobe, FaSearch, FaRocket, FaLightbulb, FaCogs,
  FaPaintBrush, FaRobot, FaShoppingCart, FaChartLine, FaShieldAlt,
  
  // SimpleIcons
  SiJavascript, SiTypescript, SiTailwindcss, SiMongodb, SiNextdotjs, SiFramer,
  SiVite, SiExpress, SiFirebase, SiPostgresql, SiGraphql, SiRedux, SiVuedotjs,
  SiAngular, SiDjango, SiLaravel, SiWordpress, SiShopify,
  SiVercel, SiGit,
  
  // Lucide
  Monitor, ShoppingCart, Layout, Smartphone, PenTool, TrendingUp, ArrowRight,
  Play, Globe, Cpu, Layers, Code, Zap, Database, Server
};

export const getIcon = (iconName) => {
  if (!iconName) return FaCode;
  return IconMap[iconName] || FaCode;
};
