
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CoffeeVisualizer from './components/CoffeeVisualizer';
import { CoffeeType, CoffeeRecipe, Difficulty } from './types';
import { ChevronLeft, Clock, Thermometer, ArrowRight, Star, Coffee as CoffeeIcon } from 'lucide-react';

// --- Data Definitions ---

const recipes: Record<CoffeeType, CoffeeRecipe> = {
  // --- Classic ---
  [CoffeeType.ESPRESSO]: {
    id: 'espresso',
    name: '浓缩咖啡',
    englishName: 'Espresso',
    description: '咖啡的基础与灵魂，口感浓郁强烈。',
    difficulty: Difficulty.MEDIUM,
    category: 'classic',
    ingredients: [
      { name: '浓缩咖啡', color: '#3f2012', heightPercent: 25, texture: 'liquid' },
      { name: '咖啡油脂 (Crema)', color: '#a77b50', heightPercent: 5, texture: 'foam' }
    ],
    tips: [
      '使用新鲜研磨的咖啡豆以获得最佳油脂。',
      '萃取时间应严格控制在 25-30 秒之间。',
      '放入预热好的浓缩咖啡杯中立即饮用，风味最佳。'
    ],
    steps: [
      '精细研磨 18-20 克咖啡豆。',
      '将咖啡粉均匀分布在手柄粉碗中。',
      '使用约 30 磅的压力进行水平压粉。',
      '萃取 25-30 秒，直到流量变细、颜色变浅。'
    ]
  },
  [CoffeeType.AMERICANO]: {
    id: 'americano',
    name: '美式咖啡',
    englishName: 'Americano',
    description: '浓缩咖啡兑水，口感清爽。',
    difficulty: Difficulty.EASY,
    category: 'classic',
    ingredients: [
      { name: '热水', color: '#bde0fe', heightPercent: 60, texture: 'liquid' },
      { name: '浓缩咖啡', color: '#3f2012', heightPercent: 20, texture: 'liquid' },
      { name: '咖啡油脂', color: '#a77b50', heightPercent: 2, texture: 'foam' }
    ],
    tips: [
      '建议将浓缩咖啡倒入热水中（Long Black 做法）以保留油脂。',
      '水温应控制在 90-94°C。',
      '经典的浓缩咖啡与水比例为 1:2 至 1:3。'
    ],
    steps: [
      '在杯中加入约 150ml 热水。',
      '萃取双份浓缩咖啡。',
      '将浓缩咖啡缓慢倒入热水中，保持表面油脂完整。'
    ]
  },

  // --- Milk ---
  [CoffeeType.LATTE]: {
    id: 'latte',
    name: '拿铁',
    englishName: 'Caffè Latte',
    description: '浓缩咖啡搭配大量蒸奶和薄奶泡。',
    difficulty: Difficulty.MEDIUM,
    category: 'milk',
    ingredients: [
      { name: '浓缩咖啡', color: '#3f2012', heightPercent: 20, texture: 'liquid' },
      { name: '蒸奶', color: '#fefae0', heightPercent: 60, texture: 'liquid' },
      { name: '薄奶泡', color: '#ffffff', heightPercent: 10, texture: 'foam' }
    ],
    tips: [
      '打发牛奶至微奶泡（Micro-foam）状态，如丝绸般顺滑。',
      '牛奶温度不应超过 65°C，以免破坏甜感。',
      '注入时稍微抬高奶缸，让牛奶穿透咖啡油脂。'
    ],
    steps: [
      '在宽口杯中萃取一份浓缩咖啡。',
      '将牛奶加热并打发至 60-65°C。',
      '将蒸奶倒入浓缩咖啡中，融合后再拉花。',
      '表面留有一层约 1cm 的细腻奶泡。'
    ]
  },
  [CoffeeType.CAPPUCCINO]: {
    id: 'cappuccino',
    name: '卡布奇诺',
    englishName: 'Cappuccino',
    description: '平衡的浓缩、蒸奶与厚奶泡。',
    difficulty: Difficulty.MEDIUM,
    category: 'milk',
    ingredients: [
      { name: '浓缩咖啡', color: '#3f2012', heightPercent: 30, texture: 'liquid' },
      { name: '蒸奶', color: '#fefae0', heightPercent: 30, texture: 'liquid' },
      { name: '厚奶泡', color: '#ffffff', heightPercent: 30, texture: 'foam' }
    ],
    tips: [
      '经典的黄金比例是 1:1:1（咖啡:奶:泡）。',
      '奶泡应绵密、厚实，且具有弹性。',
      '可根据喜好撒上少许肉桂粉或可可粉。'
    ],
    steps: [
      '萃取浓缩咖啡。',
      '打发牛奶，引入比拿铁更多的空气以产生厚奶泡。',
      '将牛奶倒入杯中，最后铺上厚厚一层奶泡。',
      '奶泡圈应被一圈咖啡油脂包围（Monk\'s Head）。'
    ]
  },
  [CoffeeType.MOCHA]: {
    id: 'mocha',
    name: '摩卡',
    englishName: 'Caffè Mocha',
    description: '巧克力与咖啡的甜蜜邂逅。',
    difficulty: Difficulty.MEDIUM,
    category: 'milk',
    ingredients: [
      { name: '巧克力酱', color: '#281208', heightPercent: 10, texture: 'liquid' },
      { name: '浓缩咖啡', color: '#3f2012', heightPercent: 20, texture: 'liquid' },
      { name: '蒸奶', color: '#fefae0', heightPercent: 50, texture: 'liquid' },
      { name: '鲜奶油', color: '#ffffff', heightPercent: 15, texture: 'solid' }
    ],
    tips: [
      '使用高品质的黑巧克力酱风味更佳。',
      '加奶前务必将巧克力酱与浓缩咖啡充分混合。',
      '顶部挤上鲜奶油是摩卡的灵魂。'
    ],
    steps: [
      '杯底加入巧克力酱。',
      '直接在巧克力上萃取浓缩咖啡。',
      '搅拌均匀使其融合。',
      '加入蒸奶，最后挤上鲜奶油装饰。'
    ]
  },

  // --- Specialty ---
  [CoffeeType.CINNAMON_LATTE]: {
    id: 'cinnamon_latte',
    name: '肉桂拿铁',
    englishName: 'Cinnamon Latte',
    description: '香甜温暖，适合秋冬的节日饮品。',
    difficulty: Difficulty.MEDIUM,
    category: 'specialty',
    ingredients: [
      { name: '肉桂糖浆', color: '#8d6e63', heightPercent: 10, texture: 'liquid' },
      { name: '浓缩咖啡', color: '#3f2012', heightPercent: 20, texture: 'liquid' },
      { name: '蒸奶', color: '#fefae0', heightPercent: 60, texture: 'liquid' },
      { name: '肉桂粉/奶泡', color: '#d7ccc8', heightPercent: 5, texture: 'foam' }
    ],
    tips: [
      '可以使用自制的肉桂糖浆风味更自然。',
      '牛奶打发温度可稍高一点（约65-70°C）以匹配温暖的口感。',
      '最后撒粉时可以使用模具制作图案。'
    ],
    steps: [
      '在咖啡杯底倒入适量肉桂糖浆。',
      '萃取浓缩咖啡直接冲入糖浆中并搅拌均匀。',
      '将打发好的热奶泡与牛奶倒入杯中融合。',
      '在奶泡上撒上肉桂粉或插上一根肉桂棒装饰。'
    ]
  },
  [CoffeeType.GOLDEN_COFFEE]: {
    id: 'golden_coffee',
    name: '黄金咖啡',
    englishName: 'Golden Latte',
    description: '温和顺滑，融入姜黄的养生咖啡。',
    difficulty: Difficulty.EASY,
    category: 'specialty',
    ingredients: [
      { name: '黄金牛奶咖啡液', color: '#fbc02d', heightPercent: 85, texture: 'liquid' },
      { name: '细腻奶泡', color: '#fffde7', heightPercent: 10, texture: 'foam' }
    ],
    tips: [
      '加入少许黑胡椒可以促进姜黄素的吸收。',
      '可以使用燕麦奶代替牛奶制作纯素版本。',
      '根据口味加入枫糖浆或蜂蜜调整甜度。'
    ],
    steps: [
      '将黑咖啡、牛奶/植物奶、姜黄粉、黑胡椒和甜味剂放入小锅。',
      '用小火加热，同时不断搅拌直至完全混合均匀且温热。',
      '倒入杯中，可使用手持奶泡器稍微打发表面。',
      '趁热饮用，享受温暖。'
    ]
  },
  [CoffeeType.COCONUT_COLD_BREW]: {
    id: 'coconut_cold_brew',
    name: '椰青冷萃',
    englishName: 'Coconut Cold Brew',
    description: '天然甜感与冷萃咖啡的清爽组合。',
    difficulty: Difficulty.EASY,
    category: 'specialty',
    ingredients: [
      { name: '冰块', color: '#e1f5fe', heightPercent: 20, texture: 'solid' },
      { name: '椰青水', color: '#f1f8e9', heightPercent: 50, texture: 'liquid' },
      { name: '冷萃咖啡', color: '#3e2723', heightPercent: 25, texture: 'liquid' },
      { name: '椰子脆片', color: '#ffffff', heightPercent: 5, texture: 'solid' }
    ],
    tips: [
      '选用新鲜椰青口感最佳，包装椰子水次之。',
      '冷萃液应提前制作，建议冷藏浸泡12小时以上。',
      '注入咖啡时要轻柔，尽量保持漂亮的分层。'
    ],
    steps: [
      '在杯中装满冰块。',
      '倒入约三分之二杯的椰青水（比例约 1:3）。',
      '缓慢注入冷萃咖啡液，使其漂浮在椰水之上。',
      '顶部撒上少许椰子脆片增加酥脆口感。'
    ]
  },
  [CoffeeType.PLUM_TEA]: {
    id: 'plum_tea',
    name: '梅子茶影咖啡',
    englishName: 'Plum Tea Coffee',
    description: '茶、酒、咖啡的三重奏。',
    difficulty: Difficulty.HARD,
    category: 'specialty',
    ingredients: [
      { name: '梅子酒与乌龙茶', color: '#d4a017', heightPercent: 40, texture: 'liquid' },
      { name: '冰块', color: '#e1f5fe', heightPercent: 30, texture: 'solid' },
      { name: '浓缩咖啡', color: '#3f2012', heightPercent: 25, texture: 'liquid' }
    ],
    tips: [
      '乌龙茶建议泡得浓一些，以平衡咖啡和酒的味道。',
      '梅子酒选择带有果肉的品种风味更佳。',
      '这款饮品层次分明，饮用前建议轻轻搅拌。'
    ],
    steps: [
      '在杯子中依次倒入梅子酒和冷却的乌龙茶汤。',
      '加入适量冰块至八分满。',
      '最后缓缓倒入萃取好的浓缩咖啡，形成漂亮分层。',
      '可点缀一颗青梅装饰。'
    ]
  },
  [CoffeeType.LEMON_SPARKLING]: {
    id: 'lemon_sparkling',
    name: '柠檬气泡特调',
    englishName: 'Espresso Tonic',
    description: '气泡水与柠檬的清爽夏日特调。',
    difficulty: Difficulty.EASY,
    category: 'specialty',
    ingredients: [
      { name: '柠檬糖浆', color: '#fff9c4', heightPercent: 15, texture: 'liquid' },
      { name: '冰块与柠檬片', color: '#e1f5fe', heightPercent: 30, texture: 'solid' },
      { name: '汤力水/苏打水', color: '#f0f4f8', heightPercent: 40, texture: 'liquid' },
      { name: '浓缩咖啡', color: '#3f2012', heightPercent: 15, texture: 'liquid' }
    ],
    tips: [
      '使用汤力水会带有一丝奎宁的苦味，苏打水则更纯粹。',
      '用柠檬皮擦拭杯口，未饮先闻其香。',
      '咖啡液不要直接倒在冰块上，以免瞬间稀释。'
    ],
    steps: [
      '在杯底倒入鲜榨柠檬汁和糖浆，搅拌均匀。',
      '杯中加满冰块，并插入两片柠檬装饰。',
      '缓缓注入汤力水或苏打水至八分满。',
      '最后慢慢倒入浓缩咖啡，形成分层效果。'
    ]
  }
};

const CATEGORIES = [
  { id: 'all', label: '全部' },
  { id: 'classic', label: '经典' },
  { id: 'milk', label: '奶咖' },
  { id: 'specialty', label: '特调' },
];

// --- Components ---

const DifficultyBadge: React.FC<{ level: Difficulty }> = ({ level }) => {
  return (
    <span className="px-2 py-1 rounded-md bg-white text-xs font-bold text-stone-600 shadow-sm border border-stone-100">
      {level}
    </span>
  );
};

const RecipeCard: React.FC<{ 
  recipe: CoffeeRecipe; 
  onClick: () => void; 
}> = ({ recipe, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-stone-100 cursor-pointer flex flex-col h-full"
    >
      {/* Top Half - Visualizer (Beige Background) */}
      <div className="bg-[#f5f5f0] relative pt-6 pb-2 px-6 flex items-end justify-center h-48">
        <div className="absolute top-4 right-4 z-10">
          <DifficultyBadge level={recipe.difficulty} />
        </div>
        <div className="w-24 h-32 transform group-hover:scale-105 transition-transform duration-500">
             <CoffeeVisualizer ingredients={recipe.ingredients} isAnimating={false} />
        </div>
      </div>

      {/* Bottom Half - Details (White Background) */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-stone-800 mb-0.5 group-hover:text-amber-700 transition-colors">
          {recipe.name}
        </h3>
        <p className="text-xs text-stone-500 font-medium mb-3">{recipe.englishName}</p>
        <p className="text-sm text-stone-600 line-clamp-2 mb-4 flex-1">
          {recipe.description}
        </p>
        
        <div className="flex items-center gap-2 mt-auto pt-4 border-t border-stone-100">
           <span className="px-2 py-1 bg-[#fcf9f6] text-[#a77b50] text-xs font-medium rounded border border-[#f5f5f0]">
             {recipe.category === 'classic' ? '经典' : recipe.category === 'milk' ? '奶咖' : '特调'}
           </span>
           <span className="px-2 py-1 bg-[#fcf9f6] text-[#a77b50] text-xs font-medium rounded border border-[#f5f5f0]">
             {recipe.steps.length} 步
           </span>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState<CoffeeRecipe | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isAnimating, setIsAnimating] = useState(false);

  // Filter logic
  const filteredRecipes = Object.values(recipes).filter(recipe => {
    if (activeCategory === 'all') return true;
    return recipe.category === activeCategory;
  });

  // Handle detailed view animation
  useEffect(() => {
    if (selectedRecipe) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [selectedRecipe]);

  return (
    <div className="min-h-screen bg-[#fcf9f6] text-stone-800 font-sans selection:bg-amber-100 selection:text-amber-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {selectedRecipe ? (
          // --- Detail View ---
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button 
              onClick={() => setSelectedRecipe(null)}
              className="group mb-6 flex items-center gap-2 text-stone-500 hover:text-amber-700 transition-colors font-medium text-sm pl-1"
            >
              <div className="bg-white p-2 rounded-full shadow-sm border border-stone-200 group-hover:border-amber-200 transition-colors">
                <ChevronLeft size={18} />
              </div>
              返回菜单
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Visual & Header */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-amber-50 rounded-full blur-3xl opacity-60"></div>
                   
                   <div className="relative z-10 flex flex-col items-center">
                     <div className="mb-6 text-center">
                       <h1 className="text-3xl font-bold text-stone-900 mb-2">{selectedRecipe.name}</h1>
                       <p className="text-amber-700 font-medium">{selectedRecipe.englishName}</p>
                     </div>

                     <div className="w-full max-w-[240px] h-[320px] mb-6">
                       <CoffeeVisualizer ingredients={selectedRecipe.ingredients} isAnimating={isAnimating} />
                     </div>

                     <button 
                        onClick={() => { setIsAnimating(false); setTimeout(() => setIsAnimating(true), 10); }}
                        className="text-xs font-bold text-stone-500 hover:text-amber-600 transition-colors uppercase tracking-widest px-6 py-2 border border-stone-200 rounded-full hover:border-amber-200 hover:bg-stone-50 bg-white shadow-sm"
                    >
                        重播制作动画
                    </button>
                   </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-2xl border border-stone-100 shadow-sm flex items-center gap-3">
                     <div className="bg-amber-50 p-2.5 rounded-xl text-amber-600">
                       <Clock size={20} />
                     </div>
                     <div>
                       <p className="text-xs text-stone-500 font-medium">预计耗时</p>
                       <p className="text-stone-800 font-bold">3-5 分钟</p>
                     </div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-stone-100 shadow-sm flex items-center gap-3">
                     <div className="bg-amber-50 p-2.5 rounded-xl text-amber-600">
                       <Star size={20} />
                     </div>
                     <div>
                       <p className="text-xs text-stone-500 font-medium">难度等级</p>
                       <p className="text-stone-800 font-bold">{selectedRecipe.difficulty}</p>
                     </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Guide */}
              <div className="lg:col-span-7 space-y-8">
                 {/* Ingredients List */}
                 <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
                   <h3 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
                     <CoffeeIcon size={20} className="text-amber-600" />
                     配方组成
                   </h3>
                   <div className="flex flex-wrap gap-3">
                      {selectedRecipe.ingredients.slice().reverse().map((layer, idx) => (
                        <div key={idx} className="flex items-center gap-2 pl-1 pr-3 py-1.5 rounded-full border border-stone-100 bg-stone-50/50">
                          <span 
                            className="w-4 h-4 rounded-full shadow-sm ring-2 ring-white" 
                            style={{ backgroundColor: layer.color }}
                          ></span>
                          <span className="text-sm font-medium text-stone-700">{layer.name}</span>
                        </div>
                      ))}
                   </div>
                 </div>

                 {/* Steps */}
                 <div>
                    <h3 className="text-lg font-bold text-stone-900 mb-4 px-2">制作步骤</h3>
                    <div className="space-y-3">
                      {selectedRecipe.steps.map((step, idx) => (
                        <div key={idx} className="flex gap-4 p-5 bg-white rounded-2xl border border-stone-200 shadow-sm group hover:border-amber-200 transition-colors">
                           <div className="flex-shrink-0 w-8 h-8 rounded-full bg-stone-100 text-stone-600 font-bold flex items-center justify-center text-sm group-hover:bg-amber-600 group-hover:text-white transition-colors">
                             {idx + 1}
                           </div>
                           <p className="text-stone-600 leading-relaxed pt-1">{step}</p>
                        </div>
                      ))}
                    </div>
                 </div>

                 {/* Tips */}
                 <div className="bg-amber-50/50 p-6 rounded-3xl border border-amber-100">
                    <h3 className="text-lg font-bold text-amber-800 mb-4 flex items-center gap-2">
                      <Star size={18} className="fill-amber-600 text-amber-600" />
                      大师贴士
                    </h3>
                    <ul className="space-y-3">
                      {selectedRecipe.tips.map((tip, idx) => (
                        <li key={idx} className="flex gap-3 text-stone-700 text-sm">
                          <ArrowRight size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                 </div>
              </div>
            </div>
          </div>
        ) : (
          // --- Menu View ---
          <div className="space-y-12 animate-in fade-in duration-500">
            {/* Hero Section */}
            <div className="text-center space-y-4 max-w-2xl mx-auto pt-4">
              <h1 className="text-5xl font-bold text-stone-800 tracking-tight">
                精通咖啡制作艺术
              </h1>
              <p className="text-lg text-stone-500 leading-relaxed">
                探索互动冲煮指南，可视化食谱和专家建议，助您每次都制作出完美的咖啡。
              </p>
            </div>

            {/* Filters */}
            <div className="flex justify-center flex-wrap gap-3">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'bg-[#a77b50] text-white shadow-lg shadow-amber-900/10 transform scale-105'
                      : 'bg-white text-stone-500 hover:text-stone-800 border border-stone-200 hover:border-stone-300'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRecipes.map((recipe) => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 
                  onClick={() => setSelectedRecipe(recipe)} 
                />
              ))}
            </div>
            
            {filteredRecipes.length === 0 && (
               <div className="text-center py-20">
                 <p className="text-stone-400">该分类下暂无咖啡配方。</p>
               </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;