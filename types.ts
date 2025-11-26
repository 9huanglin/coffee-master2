
export enum CoffeeType {
  // Classic
  ESPRESSO = 'Espresso',
  AMERICANO = 'Americano',
  
  // Milk
  LATTE = 'Latte',
  CAPPUCCINO = 'Cappuccino',
  MOCHA = 'Mocha',

  // Specialty
  CINNAMON_LATTE = 'CinnamonLatte',
  GOLDEN_COFFEE = 'GoldenCoffee',
  COCONUT_COLD_BREW = 'CoconutColdBrew',
  PLUM_TEA = 'PlumTea',
  LEMON_SPARKLING = 'LemonSparkling',
}

export enum Difficulty {
  EASY = '简单',
  MEDIUM = '中等',
  HARD = '困难',
}

export interface IngredientLayer {
  name: string;
  color: string;
  heightPercent: number; // 0-100
  texture?: 'liquid' | 'foam' | 'solid';
}

export interface CoffeeRecipe {
  id: string;
  name: string;
  englishName: string;
  description: string;
  ingredients: IngredientLayer[]; // Bottom to top
  tips: string[];
  steps: string[];
  difficulty: Difficulty;
  category: 'classic' | 'milk' | 'specialty'; 
}

// Keeping these for potential future use
export enum AspectRatio {
  SQUARE = '1:1',
  PORTRAIT_3_4 = '3:4',
  LANDSCAPE_4_3 = '4:3',
  PORTRAIT_9_16 = '9:16',
  LANDSCAPE_16_9 = '16:9',
}

export interface GeneratedImage {
  url: string;
  prompt: string;
  aspectRatio: AspectRatio;
  timestamp: number;
}