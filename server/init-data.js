const { loadData, saveData } = require('./db');
const { v4: uuidv4 } = require('uuid');

const initMythologyData = () => {
  const data = loadData();
  
  // 如果已有数据，不覆盖
  if (data.ghosts.length > 0) {
    console.log('数据库已有记录，跳过初始化');
    return;
  }

  const now = new Date().toISOString();
  const pastDate = (daysAgo) => new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString();

  // 鬼魂档案
  const ghosts = [
    {
      id: uuidv4(),
      name: '孙悟空',
      age_at_death: 1000,
      death_date: '0500-01-01',
      life_story: '石猴出世，拜师学艺。大闹天宫，被压五行山五百年。后随唐僧西天取经，历经九九八十一难，最终修成正果。',
      karma_score: 85,
      status: 'reincarnated',
      created_at: pastDate(30),
      updated_at: pastDate(20)
    },
    {
      id: uuidv4(),
      name: '猪八戒',
      age_at_death: 800,
      death_date: '0520-06-15',
      life_story: '天蓬元帅转世，因调戏嫦娥被贬下界。投胎为猪，后遇孙悟空和唐僧，随其西天取经。好色贪吃，但心地善良。',
      karma_score: 72,
      status: 'reincarnated',
      created_at: pastDate(28),
      updated_at: pastDate(18)
    },
    {
      id: uuidv4(),
      name: '沙悟净',
      age_at_death: 900,
      death_date: '0525-03-20',
      life_story: '卷帘大将转世，因打碎琉璃盏被贬下界。投胎为沙僧，在流沙河修行。后随唐僧西天取经，忠心耿耿。',
      karma_score: 78,
      status: 'reincarnated',
      created_at: pastDate(26),
      updated_at: pastDate(16)
    },
    {
      id: uuidv4(),
      name: '唐三藏',
      age_at_death: 60,
      death_date: '0600-12-25',
      life_story: '前世金蝉子，因轻视佛法被贬下界。投胎为唐僧，奉唐皇之命西天取经。一心向佛，不畏艰险，最终修成正果。',
      karma_score: 95,
      status: 'reincarnated',
      created_at: pastDate(25),
      updated_at: pastDate(15)
    },
    {
      id: uuidv4(),
      name: '白骨精',
      age_at_death: 500,
      death_date: '0530-05-10',
      life_story: '修行千年的白骨妖怪，三次变身欲害唐僧。被孙悟空识破并打死，后被收入地府。',
      karma_score: -60,
      status: 'punished',
      created_at: pastDate(24),
      updated_at: pastDate(14)
    },
    {
      id: uuidv4(),
      name: '牛魔王',
      age_at_death: 1200,
      death_date: '0480-08-08',
      life_story: '妖界之王，与孙悟空结拜。后因贪心与孙悟空反目，被收入地府。',
      karma_score: -45,
      status: 'punished',
      created_at: pastDate(23),
      updated_at: pastDate(13)
    },
    {
      id: uuidv4(),
      name: '嫦娥',
      age_at_death: 3000,
      death_date: '0001-09-15',
      life_story: '西王母之女，因服用不死药升入月宫。后因猪八戒调戏被贬下界，投胎为猪。',
      karma_score: 88,
      status: 'reincarnated',
      created_at: pastDate(22),
      updated_at: pastDate(12)
    },
    {
      id: uuidv4(),
      name: '玉皇大帝',
      age_at_death: 5000,
      death_date: '0001-01-01',
      life_story: '天界之主，统领三界。因孙悟空大闹天宫而派兵镇压，后收其为齐天大圣。',
      karma_score: 92,
      status: 'pending',
      created_at: pastDate(21),
      updated_at: pastDate(11)
    },
    {
      id: uuidv4(),
      name: '如来佛祖',
      age_at_death: 10000,
      death_date: '0001-01-01',
      life_story: '西方极乐世界之主，佛教至高无上的神。因孙悟空大闹天宫而出手镇压，将其压于五行山下。',
      karma_score: 100,
      status: 'pending',
      created_at: pastDate(20),
      updated_at: pastDate(10)
    },
    {
      id: uuidv4(),
      name: '女娲娘娘',
      age_at_death: 8000,
      death_date: '0001-01-01',
      life_story: '上古女神，创造人类。补天救世，功德无量。',
      karma_score: 99,
      status: 'pending',
      created_at: pastDate(19),
      updated_at: pastDate(9)
    },
    {
      id: uuidv4(),
      name: '孙中山',
      age_at_death: 58,
      death_date: '1925-03-12',
      life_story: '民国时期伟大的革命先行者，推翻满清统治，建立中华民国。',
      karma_score: 96,
      status: 'pending',
      created_at: pastDate(18),
      updated_at: pastDate(8)
    },
    {
      id: uuidv4(),
      name: '妲己',
      age_at_death: 300,
      death_date: '1046-01-20',
      life_story: '商纣王的妃子，九尾狐妖转世。蛊惑纣王，导致商朝灭亡。后被周武王诛杀。',
      karma_score: -80,
      status: 'punished',
      created_at: pastDate(17),
      updated_at: pastDate(7)
    },
    {
      id: uuidv4(),
      name: '哪吒',
      age_at_death: 18,
      death_date: '1050-06-06',
      life_story: '莲花化身，天生神力。与龙王之子敖丙冲突，自刎而死。后被太乙真人救活，成为护法神。',
      karma_score: 82,
      status: 'reincarnated',
      created_at: pastDate(16),
      updated_at: pastDate(6)
    },
    {
      id: uuidv4(),
      name: '杨戬',
      age_at_death: 2000,
      death_date: '0800-07-07',
      life_story: '二郎神，沉香之父。神通广大，三只眼睛能看穿妖魔鬼怪。',
      karma_score: 90,
      status: 'pending',
      created_at: pastDate(15),
      updated_at: pastDate(5)
    },
    {
      id: uuidv4(),
      name: '西施',
      age_at_death: 35,
      death_date: '0473-05-05',
      life_story: '古代四大美女之一，越国美女。被献给吴王夫差，后沉江而死。',
      karma_score: 75,
      status: 'reincarnated',
      created_at: pastDate(14),
      updated_at: pastDate(4)
    },
    {
      id: uuidv4(),
      name: '貂蝉',
      age_at_death: 28,
      death_date: '0192-12-15',
      life_story: '古代四大美女之一，三国时期美女。用美色离间董卓和吕布，后被吕布所杀。',
      karma_score: 68,
      status: 'reincarnated',
      created_at: pastDate(13),
      updated_at: pastDate(3)
    }
  ];

  // 转世记录
  const reincarnations = [
    {
      id: uuidv4(),
      ghost_id: ghosts[0].id, // 孙悟空
      next_life: '斗战胜佛',
      reincarnation_date: '0600-01-01',
      status: 'completed',
      created_at: pastDate(20)
    },
    {
      id: uuidv4(),
      ghost_id: ghosts[1].id, // 猪八戒
      next_life: '净坛使者',
      reincarnation_date: '0600-01-01',
      status: 'completed',
      created_at: pastDate(19)
    },
    {
      id: uuidv4(),
      ghost_id: ghosts[2].id, // 沙悟净
      next_life: '金身罗汉',
      reincarnation_date: '0600-01-01',
      status: 'completed',
      created_at: pastDate(18)
    },
    {
      id: uuidv4(),
      ghost_id: ghosts[3].id, // 唐三藏
      next_life: '旃檀功德佛',
      reincarnation_date: '0600-01-01',
      status: 'completed',
      created_at: pastDate(17)
    },
    {
      id: uuidv4(),
      ghost_id: ghosts[12].id, // 哪吒
      next_life: '三坛海会大神',
      reincarnation_date: '1100-01-01',
      status: 'completed',
      created_at: pastDate(10)
    }
  ];

  // 刑罚记录
  const punishments = [
    {
      id: uuidv4(),
      ghost_id: ghosts[4].id, // 白骨精
      punishment_type: '油锅地狱',
      duration_days: 3650,
      reason: '三次变身欲害唐僧，妖心不改，罪恶深重',
      status: 'active',
      start_date: pastDate(24),
      end_date: new Date(Date.now() + 3650 * 24 * 60 * 60 * 1000).toISOString(),
      created_at: pastDate(24)
    },
    {
      id: uuidv4(),
      ghost_id: ghosts[5].id, // 牛魔王
      punishment_type: '刀山地狱',
      duration_days: 5000,
      reason: '妖界之王，贪心不足，与取经人为敌',
      status: 'active',
      start_date: pastDate(23),
      end_date: new Date(Date.now() + 5000 * 24 * 60 * 60 * 1000).toISOString(),
      created_at: pastDate(23)
    },
    {
      id: uuidv4(),
      ghost_id: ghosts[11].id, // 妲己
      punishment_type: '火海地狱',
      duration_days: 10000,
      reason: '蛊惑纣王，导致商朝灭亡，生灵涂炭',
      status: 'active',
      start_date: pastDate(17),
      end_date: new Date(Date.now() + 10000 * 24 * 60 * 60 * 1000).toISOString(),
      created_at: pastDate(17)
    }
  ];

  data.ghosts = ghosts;
  data.reincarnations = reincarnations;
  data.punishments = punishments;

  saveData(data);
  console.log('✅ 神话人物数据初始化完成！');
  console.log(`📊 已添加 ${ghosts.length} 个鬼魂档案`);
  console.log(`🔄 已添加 ${reincarnations.length} 条转世记录`);
  console.log(`⚖️ 已添加 ${punishments.length} 条刑罚记录`);
};

if (require.main === module) {
  initMythologyData();
}

module.exports = { initMythologyData };
