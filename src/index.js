const { Lunar } = require('lunar-javascript');
const moment = require('moment');

const pushLog = (log, v) => {
    console.log(v)
    log.push(v)
}
const qimen = () => {
    // 八卦宫位
    const baguaGong = [
        {
            bagua: '巽',
            gong: 4,
        },
        {
            bagua: '离',
            gong: 9,
        },
        {
            bagua: '坤',
            gong: 2,
        },
        {
            bagua: '震',
            gong: 3,
        },
        {
            bagua: '',
            gong: 5,
        },
        {
            bagua: '兑',
            gong: 7,
        },
        {
            bagua: '艮',
            gong: 8,
        },
        {
            bagua: '坎',
            gong: 1,
        },
        {
            bagua: '乾',
            gong: 6,
        },
    ]
    // 60甲子
    const jiazi60 = [
        ['甲子', '戊', '乙丑', '丙寅', '丁卯', '戊辰', '己巳', '庚午', '辛未', '壬申', '癸酉', '戌亥'],
        ['甲戌', '己', '乙亥', '丙子', '丁丑', '戊寅', '己卯', '庚辰', '辛巳', '壬午', '癸未', '申酉'],
        ['甲申', '庚', '乙酉', '丙戌', '丁亥', '戊子', '己丑', '庚寅', '辛卯', '壬辰', '癸巳', '午未'],
        ['甲午', '辛', '乙未', '丙申', '丁酉', '戊戌', '己亥', '庚子', '辛丑', '壬寅', '癸卯', '辰巳'],
        ['甲辰', '壬', '乙巳', '丙午', '丁未', '戊申', '己酉', '庚戌', '辛亥', '壬子', '癸丑', '寅卯'],
        ['甲寅', '癸', '乙卯', '丙辰', '丁巳', '戊午', '己未', '庚申', '辛酉', '壬戌', '癸亥', '子丑']
    ]
    // 节气九宫格
    const jieqi99 = [
        { name: '立夏', nums: '417', yinyang: '阳', },
        { name: '小满', nums: '528', yinyang: '阳', }, 
        { name: '芒种', nums: '639', yinyang: '阳', }, 
        { name: '夏至', nums: '936', yinyang: '阴', }, 
        { name: '小暑', nums: '825', yinyang: '阴', }, 
        { name: '大暑', nums: '714', yinyang: '阴', }, 
        { name: '立秋', nums: '258', yinyang: '阴', }, 
        { name: '处暑', nums: '147', yinyang: '阴', }, 
        { name: '白露', nums: '936', yinyang: '阴', }, 
        { name: '春分', nums: '396', yinyang: '阳', }, 
        { name: '清明', nums: '417', yinyang: '阳', }, 
        { name: '谷雨', nums: '528', yinyang: '阳', }, 
        { name: '秋分', nums: '714', yinyang: '阴', }, 
        { name: '寒露', nums: '693', yinyang: '阴', }, 
        { name: '霜降', nums: '582', yinyang: '阴', }, 
        { name: '立春', nums: '852', yinyang: '阳', }, 
        { name: '雨水', nums: '963', yinyang: '阳', }, 
        { name: '惊蛰', nums: '174', yinyang: '阳', }, 
        { name: '冬至', nums: '174', yinyang: '阳', }, 
        { name: '小寒', nums: '285', yinyang: '阳', }, 
        { name: '大寒', nums: '396', yinyang: '阳', }, 
        { name: '立冬', nums: '693', yinyang: '阴', }, 
        { name: '小雪', nums: '582', yinyang: '阴', }, 
        { name: '大雪', nums: '471', yinyang: '阴', }, 
    ]

    // 八卦在九宫格的顺序
    const baguaSorts = ['巽', '离', '坤', '震', '', '兑', '艮', '坎', '乾']
    // 八卦宫数在九宫格的顺序
    const gongSorts = [4, 9, 2, 3, 5, 7, 8, 1, 6]
    // 原始九星八门八神
    const originXingMenShen = [
        { shen: '六合', xing: '天辅', men: '杜门' },
        { shen: '勾陈、白虎', xing: '天英', men: '景门' },
        { shen: '朱雀、玄武', xing: '天芮', men: '死门' },
        { shen: '太阴', xing: '天冲', men: '伤门' },
        { shen: '', xing: '天禽', men: '' },
        { shen: '九地', xing: '天柱', men: '惊门' },
        { shen: '腾蛇', xing: '天任', men: '生门' },
        { shen: '值符', xing: '天蓬', men: '休门' },
        { shen: '九天', xing: '天心', men: '开门' },
    ]

    let ym = ''             // 日期
    let dateLunar = ''      // 农历
    let hm = ''             // 时间
    let yearZhu = ''        // 年柱
    let monthZhu = ''       // 月柱
    let dayZhu = ''         // 日柱
    let timeZhu = ''        // 时柱
    let dun = ''            // 遁
    let jushu = ''          // 局数
    let xunshou = ''        // 旬首
    let liuyi = ''          // 六仪
    let zhifu = ''          // 值符
    let zhishi = ''         // 值使
    let cells = [           // 九宫格最终结果
        {
            bagua: '',
            gong: 0,
            bashen: '',
            kong: false,
            ma: false,
            zhonggongdipangan: '',
            bamen: '',
            tianpangan: '',
            angan: '',
            zhifujiuxing: '',
            dipanqiyi: ''
        },
        {
            bagua: '',
            gong: 0,
            bashen: '',
            kong: false,
            ma: false,
            zhonggongdipangan: '',
            bamen: '',
            tianpangan: '',
            angan: '',
            zhifujiuxing: '',
            dipanqiyi: ''
        },
        {
            bagua: '',
            gong: 0,
            bashen: '',
            kong: false,
            ma: false,
            zhonggongdipangan: '',
            bamen: '',
            tianpangan: '',
            angan: '',
            zhifujiuxing: '',
            dipanqiyi: ''
        },
        {
            bagua: '',
            gong: 0,
            bashen: '',
            kong: false,
            ma: false,
            zhonggongdipangan: '',
            bamen: '',
            tianpangan: '',
            angan: '',
            zhifujiuxing: '',
            dipanqiyi: ''
        },
        {
            bagua: '',
            gong: 0,
            bashen: '',
            kong: false,
            ma: false,
            zhonggongdipangan: '',
            bamen: '',
            tianpangan: '',
            angan: '',
            zhifujiuxing: '',
            dipanqiyi: ''
        },
        {
            bagua: '',
            gong: 0,
            bashen: '',
            kong: false,
            ma: false,
            zhonggongdipangan: '',
            bamen: '',
            tianpangan: '',
            angan: '',
            zhifujiuxing: '',
            dipanqiyi: ''
        },
        {
            bagua: '',
            gong: 0,
            bashen: '',
            kong: false,
            ma: false,
            zhonggongdipangan: '',
            bamen: '',
            tianpangan: '',
            angan: '',
            zhifujiuxing: '',
            dipanqiyi: ''
        },
        {
            bagua: '',
            gong: 0,
            bashen: '',
            kong: false,
            ma: false,
            zhonggongdipangan: '',
            bamen: '',
            tianpangan: '',
            angan: '',
            zhifujiuxing: '',
            dipanqiyi: ''
        },
        {
            bagua: '',
            gong: 0,
            bashen: '',
            kong: false,
            ma: false,
            zhonggongdipangan: '',
            bamen: '',
            tianpangan: '',
            angan: '',
            zhifujiuxing: '',
            dipanqiyi: ''
        }
    ]
    let logs = []

    // 1. 根据节气确定阴阳遁
    let jieqi = ''
    const calcYinyangByJieqi = (date) => {
        jieqi = Lunar.fromDate(date).getPrevJieQi(false).getName()
        const findJieqi = jieqi99.find(v => v.name === jieqi)
        if (!findJieqi) {
            const msg = `节气匹配错误 ${jieqi}`
            console.error(msg, date);
            throw new Error(msg)
        }
        dun = findJieqi.yinyang

        const log = `第一步，定阴阳遁，由于现在节气是 ${jieqi}，所以现在是 ${dun} 遁`
        pushLog(logs, log)
    }

    // 2. 排四柱、标旬空
    let kongRi = ''     // 日柱空
    let kongShi = ''    // 时柱空
    const calcSizhuXunkong = (date) => {
        const nian = Lunar.fromDate(date).getYearInGanZhiExact()
        const yue = Lunar.fromDate(date).getMonthInGanZhiExact()
        const ri = Lunar.fromDate(date).getDayInGanZhiExact()
        const shi = Lunar.fromDate(date).getTimeInGanZhi()
        
        yearZhu = nian
        monthZhu = yue
        dayZhu = ri
        timeZhu = shi

        pushLog(logs, `第二步，排四柱，时-日-月-年分别是： ${timeZhu}, ${dayZhu}, ${monthZhu}, ${yearZhu}`)
        
        
        const findKongRowRi = jiazi60.find(v => v.includes(ri))
        if (!findKongRowRi) {
            const msg = `日柱空找不到 日柱：${ri}`
            console.error(msg)
            throw Error(msg)
        }
        kongRi = findKongRowRi.at(-1)
        const findKongRowShi = jiazi60.find(v => v.includes(shi))
        if (!findKongRowRi) {
            const msg = `时柱空找不到 时柱：${shi}`
            console.error(msg)
            throw Error(msg)
        }
        kongShi = findKongRowShi.at(-1)

        pushLog(logs, `标旬空，日柱空是 ${kongRi}，时柱空是 ${kongShi}`)
    }

    // 3. 定局数
    let futou = ''
    let futouDizhi = ''
    let yuan = ''
    const calcJushu = (date) => {
        /**
         * 3.1. 找符头
         * 在六十甲子中找到日柱的行，从日柱开始往左数，先遇到的「甲」或「己」就是符头
         * 单行内，第(数组下标6)列是「己」列，小于6的都是甲，其余都是己
         */
        const findRizhuRow = jiazi60.find(v => v.includes(dayZhu))
        if (!findRizhuRow) {
            const msg = `找符头时没有找到日柱所在的行 日柱：${dayZhu}`
            console.error(msg)
            throw Error(msg)
        }
        const findRizhuInRowIndex = findRizhuRow.findIndex(v => v === dayZhu)
        if (findRizhuInRowIndex === -1) {
            const msg = `找符头时没有在行内找到日柱？？不可能吧 日柱：${dayZhu}`
            console.error(msg, findRizhuRow)
            throw Error(msg)
        }
        if (findRizhuInRowIndex < 6) {
            futou = '甲'
        } else {
            futou = '己'
        }
        pushLog(logs, `第 3.1 步，找到了符头：${futou}`)
        
        /**
         * 3.2. 根据符头地支确定上中下元
         * 
         * @Todo 符头括号里遇到「己」算不算
         */
        // pushLog(logs, 'findRizhuInRowIndex', findRizhuInRowIndex)
        
        for (let i = findRizhuInRowIndex; i >= 0; i --) {
            // pushLog(logs, 'findRizhuRow[i]', findRizhuRow[i])
            
            if (findRizhuRow[i].length === 1) continue

            if (['甲', '己'].includes(findRizhuRow[i][0])) {
                futouDizhi = findRizhuRow[i][1]
                break
            }
        }
        if (!futouDizhi) {
            const msg = `找符头时没有找到符头地支，肯定是代码写错了 日柱：${dayZhu}`
            console.error(msg, findRizhuRow)
            throw Error(msg)
        }
        pushLog(logs, `第 3.2 步，找到了符头地支：${futouDizhi}`)

        if ('子午卯酉'.indexOf(futouDizhi) > -1) {
            yuan = '上'
        } else if ('寅申巳亥'.indexOf(futouDizhi) > -1) {
            yuan = '中'
        } else if ('辰戌丑未'.indexOf(futouDizhi) > -1) {
            yuan = '下'
        }
        if (!yuan) {
            const msg = `定上中下元的时候没定出来？肯定是代码写错了，符头地支是：${futouDizhi}`
            console.error(msg, yuan, futouDizhi)
            throw Error(msg)
        }
        pushLog(logs, `第 3.3 步，定了元：${yuan}`)

        /**
         * 3.3. 根据节气和三元定局数
         */
        const findJieqi = jieqi99.find(v => v.name === jieqi)
        if (!findJieqi || !findJieqi.nums) {
            const msg = `节气匹配错误 ${jieqi}`
            console.error(msg, date);
            throw new Error(msg)
        }
        const jushuIndex = {
            '上': 0,
            '中': 1,
            '下': 2
        }[yuan]
        
        jushu = findJieqi.nums[jushuIndex]
        if (!jushu) {
            const msg = `局数错误 ${yuan}`
            console.error(msg, yuan, findJieqi.nums);
            throw new Error(msg)
        }
        pushLog(logs, `第 3.4 步，定了局数：${jushu}`)
    }

    // 4. 画九宫格，初始化八卦，初始化日期和阴历
    const initCells = (date) => {
        cells.forEach((v, k) => {
            cells[k].bagua = baguaSorts[k]
            cells[k].gong = gongSorts[k]
        })

        ym = moment(date).format('DD/MM/YYYY') + `（${Lunar.fromDate(date).getWeekInChinese()}）`
        dateLunar = [
            Lunar.fromDate(date).getMonthInChinese(),
            '月',
            Lunar.fromDate(date).getDayInChinese(),
        ].join('')
        hm = moment(date).format('HH:mm') + '(+8)'

        pushLog(logs, `第四步，画了九宫格，初始化了八卦位置，顺便计算了日期：${ym}，阴历：${dateLunar}，时间 ${hm}`)
    }

    /**
     * 5. 布地盘奇仪
     * 奇仪的顺序永远都是：戊己庚辛壬癸丁丙乙
     * 目前几局，戊就落在几宫
     * 阳盾顺布，阴盾逆布
     */
    let qiyiSort = ['戊', '己', '庚', '辛', '壬', '癸', '丁', '丙', '乙']
    const calcDipanQiyi = (date) => {
        pushLog(logs, '第5步，排地盘奇仪，这玩意老好玩了')
        
        let index = jushu - 0
        pushLog(logs, `现在的局数是 ${jushu}，所以从第 ${index} 宫开始排`);
        // pushLog(logs, cells)
        
        while (1) {
            const qiyi = qiyiSort.shift()
            const findCellIndex = cells.findIndex(v => v.gong === index)
            // pushLog(logs, 'findCellIndex', findCellIndex, index, typeof index)
            
            cells[findCellIndex].dipanqiyi = qiyi
            pushLog(logs, `${qiyi} => ${cells[findCellIndex].bagua}${cells[findCellIndex].gong}`)
            

            if (qiyiSort.length === 0) break

            if (dun === '阳') {
                if (index === 9) index = 1
                else index ++
                
                // pushLog(logs, `由于现在是阳遁，顺排，即将安排 ${index}`)
                
            }
            if (dun === '阴') {
                if (index === 1) index = 9
                else index --

                // pushLog(logs, `由于现在是阴遁，逆排，即将安排 ${index}`)
            }
        }
    }

    /**
     * 6. 找旬首六仪
     * 拿时柱去六十甲子中找，时柱所在行，最左边就是旬首，括号里是六仪。
     */
    const calcLiuyi = (date) => {
        const findShizhuRow = jiazi60.find(v => v.includes(timeZhu))
        if (!findShizhuRow) {
            const msg = `找旬首六仪的时候没有找到时柱所在行 ${timeZhu}`
            console.error(msg);
            throw new Error(msg)
        }
        xunshou = findShizhuRow[0]
        liuyi = findShizhuRow[1]

        pushLog(logs, `第6步，找到了旬首「${xunshou}」六仪「${liuyi}」`)
    }

    /**
     * 7. 根据六仪找值符星和值使门
     * 六仪在第五步落在哪宫，就去原始九星八门的宫位找
     * 对应的九星就是值符，对应的八门就是值使
     */
    const calcZhifuZhishi = (date) => {
        let findLiuyiIndex = cells.findIndex(v => v.dipanqiyi === liuyi)
        // pushLog(logs, 'findLiuyiIndex', findLiuyiIndex);
        
        if (findLiuyiIndex === 4) {
            findLiuyiIndex = 2
        }
        if (findLiuyiIndex === -1) {
            const msg = `找值符值使的时候没有找到六仪的宫位 ${liuyi}`
            console.error(msg, cells);
            throw new Error(msg)
        }
        zhifu = originXingMenShen[findLiuyiIndex].xing
        zhishi = originXingMenShen[findLiuyiIndex].men

        pushLog(logs, `第7步，找到了值符「${zhifu}」值使「${zhishi}」`);
    }

    /**
     * 8. 布值符九星
     * 起局时干在哪宫，就将值符直接落入此宫
     * 按顺时针将其余九星落入
     * 
     * 如果时干落入中宫，则飞到坤2宫（右上角，宫格 index = 2）
     */
    const jiuxingSort = ['天蓬', '天任', '天冲', '天辅', '天英', '天芮天禽', '天柱', '天心']
    const gongShunSort = [0, 1, 2, 5, 8, 7, 6, 3]
    const calcZhifuJiuxing = (date) => {
        // 时干就是时柱的第一个字
        let timeGan = timeZhu[0]
        if (timeGan === '甲') {
            pushLog(logs, '时干遇到甲了，那就去跟六仪在同一宫')
            
            timeGan = liuyi
        }
        let shiganGongIndex = cells.findIndex(v => v.dipanqiyi === timeGan)
        if (shiganGongIndex === -1) {
            const msg = `排值符九星的时候没找到时干在哪，时柱：${timeZhu}，时干：${timeGan}`
            console.error(msg, cells)
            throw new Error(msg)
        }

        pushLog(logs, `第8步，布值符九星，时干 ${timeGan} 在 ${cells[shiganGongIndex].bagua}${cells[shiganGongIndex].gong}`)
        if (shiganGongIndex === 4) {
            pushLog(logs, '一不小心落入了中宫，那就飞入坤2')
            shiganGongIndex = 2
        }
        // 值符在顺序中的 index
        const _zhifu = ['天芮', '天禽'].includes(zhifu) ? '天芮天禽' : zhifu
        let zhifuIndex = jiuxingSort.findIndex(v => v === _zhifu)
        // 宫位在顺序中的 index
        let gongIndex = gongShunSort.findIndex(v => v === shiganGongIndex)

        pushLog(logs, `将值符 ${zhifu} 落入这里，然后开转！`)


        // 理了一下顺序，整理出来了九星和宫位各自在九宫格内的 index
        let jiuxings = []
        for (let i = zhifuIndex; jiuxings.length < jiuxingSort.length;) {
            jiuxings.push(jiuxingSort[i])
            i = i === 7 ? 0 : i + 1
        }
        let gongs = []
        for (let i = gongIndex; gongs.length < gongShunSort.length;) {
            gongs.push(gongShunSort[i])
            i = i === 7 ? 0 : i + 1
        }
        for (let i = 0; i <= 7; i ++) {
            cells[gongs[i]].zhifujiuxing = jiuxings[i]
            pushLog(logs, `${jiuxings[i]} => ${cells[gongs[i]].bagua}${cells[gongs[i]].gong}`)
        }
    }

    /**
     * 9. 布值使八门
     * 八门顺序固定：休生伤杜景死惊开，永远顺时针排布
     * 起局时干序数：甲乙丙丁戊己庚辛壬癸 对应 1 - 10
     * 时干序数是几，就阳盾顺阴盾逆，从旬首的六仪宫位，按八卦宫位数，数完了将值使落下
     * 值使如果落入中宫则飞入坤2
     * 其余八门顺时针落入
     * 
     */
    const shiganSort = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
    const bamenSort = ['休', '生', '伤', '杜', '景', '死', '惊', '开']
    const calcZhishiBamen = date => {
        let shiganNum = shiganSort.findIndex(v => v === timeZhu[0])
        if (shiganNum === -1) {
            const msg = `布值使八门时，没有在天干顺序中找到时干？？？时干：${timeZhu[0]}`
            console.error(msg)
            throw new Error(msg)
        }
        // 找到的 index 得 +1 才是顺序数
        shiganNum ++
        // 找六仪对应的八卦宫位
        const liuyiGong = cells.find(v => v.dipanqiyi === liuyi)
        if (!liuyiGong || !liuyiGong.gong) {
            const msg = `布值使八门时，没有在已有宫格中找到六仪对应的八卦宫位，六仪：${liuyi}`
            console.error(msg, liuyiGong)
            throw new Error(msg)
        }
        // 要落的八卦宫位
        // pushLog(logs, 'liuyiGong.gong', liuyiGong.gong)
        let luo = liuyiGong.gong
        while (1) {
            shiganNum --
            if (shiganNum === 0) {
                break
            }
            if (dun === '阳') {
                if (luo === 9) {
                    luo = 1
                } else {
                    luo ++
                }
            }
            if (dun === '阴') {
                if (luo === 1) {
                    luo = 9
                } else {
                    luo --
                }
            }
            
        }
        // pushLog(logs, 'luo', luo)
        
        let findLuoGongIndex = cells.findIndex(v => v.gong === luo)
        if (findLuoGongIndex === -1) {
            const msg = `布值使八门时，落入的宫位不太对，应该是没转明白。luo：${luo}`
            console.error(msg, findLuoGongIndex)
            throw new Error(msg)
        }
        // cells[findLuoGongIndex].bamen = zhishi 不着急落 后面一起落
        if (findLuoGongIndex === 4) {
            pushLog(logs, `第9步，落第一个八门，很不巧落入中宫了，那么飞入坤2`)
            findLuoGongIndex = 2
        }
        pushLog(logs, `第9步，值使 ${zhishi} 落入 ${cells[findLuoGongIndex].bagua}${cells[findLuoGongIndex].gong}`)

        // 理了一下顺序，整理出来了八门和宫位各自在九宫格内的 index
        let bamens = []
        let menIndex = bamenSort.findIndex(v => `${v}门` === zhishi)
        if (menIndex === -1) {
            const msg = `布值使八门时，要落的第一门没有在八门顺序中找到。zhishi：${zhishi}`
            console.error(msg)
            throw new Error(msg)
        }
        for (i = 0; i < 8; i ++) {
            bamens.push(bamenSort[menIndex])
            menIndex = menIndex === 7 ? 0 : menIndex + 1
        }
        let gongs = []
        let gongIndex = gongShunSort.findIndex(v => v === findLuoGongIndex)
        for (i = 0; i < 8; i ++) {
            gongs.push(gongShunSort[gongIndex])
            gongIndex = gongIndex === 7 ? 0 : gongIndex + 1
        }
        // 终于准备完了  开始落
        for (i = 0; i < 8; i ++) {
            pushLog(logs, `${bamens[i]} => ${cells[gongs[i]].bagua}${cells[gongs[i]].gong}`);        
            cells[gongs[i]].bamen = bamens[i]
        }
    }

    /**
     * 10. 排八神
     * 值符 腾蛇 太阴 六合 白虎  玄武  九地  九天
     * 八神的值符叫「小值符」，小值符永远跟大值符在同一个位置，其余八神按阳顺阴逆落入即可
     */
    const bashenSort = ['值符', '腾蛇', '太阴', '六合', '白虎', '玄武', '九地', '九天']
    const calcBashen = (date) => {
        const _zhifu = ['天芮', '天禽'].includes(zhifu) ? '天芮天禽' : zhifu
        const findDaZhifuIndex = cells.findIndex(v => v.zhifujiuxing === _zhifu)
        if (findDaZhifuIndex === -1) {
            const msg = `排八神时，没找到之前的值符在哪。zhifu：${zhifu}`
            console.error(msg, cells)
            throw new Error(msg)
        }
        const gongSort = dun === '阳' ? [...gongShunSort] : gongShunSort.slice().reverse()
        
        let gongIndex = gongSort.findIndex(v => v === findDaZhifuIndex)

        pushLog(logs, '第 10 步，排八神')
        for (let i = 0; i < 8; i ++) {
            cells[gongSort[gongIndex]].bashen = bashenSort[i]
            pushLog(logs, `${bashenSort[i]} => ${cells[gongSort[gongIndex]].bagua}${cells[gongSort[gongIndex]].gong}`)
            gongIndex = gongIndex === 7 ? 0 : gongIndex + 1
        }
    }

    /**
     * 11. 标空亡
     * 看时柱对应的空，到对照表中找空亡在哪个格。
     * 空亡最多能标两个格
     */
    const kongTable = [
        // 空亡对照表，索引是九宫格的 index
        ['辰', '巳'],
        ['午'],
        ['未', '申'],
        ['卯'],
        [],
        ['酉'],
        ['寅', '丑'],
        ['子'],
        ['戌', '亥']
    ]
    const calcKongWang = (date) => {
        const findShizhuRow = jiazi60.find(v => v.includes(timeZhu))
        const kong = findShizhuRow.at(-1)
        pushLog(logs, `第 11 步，标空亡。先找到时柱 ${timeZhu} 的空是：${kong}`)
        let kongIndexs = []
        kong.split('').forEach(v => {
            const _kongIndex = kongTable.findIndex(vv => vv.includes(v))
            if (_kongIndex === -1) {
                const msg = `标空亡时，没找到时柱空 ${v} 应该在哪宫？`
                console.error(msg)
                throw new Error(msg)
            }
            kongIndexs.push(_kongIndex)
        })
        pushLog(logs, `在 ${[...new Set(kongIndexs)].map(v => `${cells[v].bagua}${cells[v].gong}`).join('、')} 找到了包含时柱空「${kong}」`)
        kongIndexs.forEach(v => {
            cells[v].kong = true
        })
    }

    /**
     * 12. 标驿马星
     * 看时辰的地支，只有可能在四个角
     */
    const maTable = [
        '亥卯未',
        '',
        '寅午戌',
        '',
        '',
        '',
        '申子辰',
        '',
        '巳酉丑'
    ]
    const calcMa = () => {
        const timeDizhi = timeZhu[1]
        const findMaIndex = maTable.findIndex(v => v.indexOf(timeDizhi) > -1)
        cells[findMaIndex].ma = true
        pushLog(logs, `第 12 步，标驿马星。在 ${cells[findMaIndex].bagua}${cells[findMaIndex].gong} 找到了时柱地支 ${timeDizhi}，驿马星在这个位置`)
    }

    /**
     * 13. 天盘干
     * 找到值符宫位的原始九星，再找原始九星现在的位置。
     * 原始九星现在的位置，落入当前时干，作为天盘干。用方框标记。
     * 将天盘干按地盘干同样的顺序排列。
     */
    const calcTianPanGan = (date) => {
        pushLog(logs, `第 13 步 排天盘干`)

        // 值符的宫位
        const _zhifu = ['天芮', '天禽'].includes(zhifu) ? '天芮天禽' : zhifu
        const findZhifuIndex = cells.findIndex(v => v.zhifujiuxing === _zhifu)
        // console.log('zhifu', zhifu);
        
        pushLog(logs, `值符 ${zhifu} 在 ${cells[findZhifuIndex].bagua}${cells[findZhifuIndex].gong}`)
        // 值符宫位对应的原始九星
        let findOriginJiuXing = originXingMenShen[findZhifuIndex].xing
        pushLog(logs, `对照表可以查出原始九星是 ${findOriginJiuXing}`);
        if (['天芮', '天禽'].includes(findOriginJiuXing)) {
            findOriginJiuXing = '天芮天禽'
        }
        // 原始九星现在的位置
        const findJiuxingNowIndex = cells.findIndex(v => v.zhifujiuxing === findOriginJiuXing)
        // pushLog(logs, 'findJiuxingNowIndex', findJiuxingNowIndex)
        
        pushLog(logs, `原始九星 ${findOriginJiuXing} 现在的位置是 ${cells[findJiuxingNowIndex].bagua}${cells[findJiuxingNowIndex].gong}`)
        // 原始九星对应的顺时针 index就是即将要用的天盘干的顺时针index
        // 时干
        const timeGan = timeZhu[0] === '甲' ? liuyi : timeZhu[0]
        // 时干在地盘干中的位置
        // 如果时干在中宫，飞入坤2
        let findTimeGanInDiIndex = cells.findIndex(v => v.dipanqiyi === timeGan)
        if (findTimeGanInDiIndex === 4) {
            findTimeGanInDiIndex = 2
        }
        let tianIndex = gongShunSort.findIndex(v => v === findJiuxingNowIndex)
        // console.log('findTimeGanInDiIndex', findTimeGanInDiIndex, tianIndex);
        
        pushLog(logs, `时干 ${timeGan} 写入 ${cells[findJiuxingNowIndex].bagua}${cells[findJiuxingNowIndex].gong}，然后开转`)
        let diIndex = gongShunSort.findIndex(v => v === findTimeGanInDiIndex)
        // pushLog(logs, 'diIndex', findTimeGanInDiIndex, diIndex)
        
        
        for (let i = 0; i < 8; i ++) {
            // console.log('gongShunSort[diIndex]', gongShunSort, diIndex, gongShunSort[diIndex])
            
            pushLog(logs, `${cells[gongShunSort[diIndex]].dipanqiyi} => ${cells[gongShunSort[tianIndex]].bagua}${cells[gongShunSort[tianIndex]].gong}`)
            
            cells[gongShunSort[tianIndex]].tianpangan = cells[gongShunSort[diIndex]].dipanqiyi + (i === 0 ? '*' : '')
            tianIndex = tianIndex === 7 ? 0 : tianIndex + 1
            diIndex = diIndex === 7 ? 0 : diIndex + 1
        }
    }

    /**
     * 14. 中宫地盘干落入天芮天禽
     */
    const calcRuiQinZhongDi = () => {
        const zhongDiGan = cells[4].dipanqiyi
        const findRuiQinIndex = cells.findIndex(v => v.zhifujiuxing === '天芮天禽')
        pushLog(logs, `第 14 步，中宫地盘干 ${zhongDiGan} 落入天芮天禽所在的 ${cells[findRuiQinIndex].bagua}${cells[findRuiQinIndex].gong}`)
        
        cells[findRuiQinIndex].zhonggongdipangan = zhongDiGan
    }
    const main = (date = null) => {
        if (date === null) {
            date = new Date()
            // date = new Date('2025-06-26 21:05:00')
        }

        console.log(`现在开始排 ${moment(date).format('YYYY-MM-DD HH:mm')}`);
        
        // 1. 根据节气确定阴阳遁
        calcYinyangByJieqi(date)

        // 2. 排四柱、标旬空
        calcSizhuXunkong(date)

        // 3. 定局数
        calcJushu(date)

        // 4. 画九宫格，初始化八卦，初始化日期和阴历
        initCells(date)

        // 5. 布地盘奇仪
        calcDipanQiyi(date)
        
        // 6. 找旬首六仪
        calcLiuyi(date)

        // 7. 根据六仪找值符星和值使门
        calcZhifuZhishi(date)

        // 8. 布值符九星
        calcZhifuJiuxing(date)

        // 9. 布值使八门
        calcZhishiBamen(date)

        // 10. 排八神
        calcBashen(date)

        // 11. 标空亡
        calcKongWang(date)

        // 12. 标驿马星
        calcMa(date)

        // 13. 天盘干
        calcTianPanGan(date)

        // 14. 中宫地盘干落入天芮天禽
        calcRuiQinZhongDi(date)

        return {
            ym,
            dateLunar,
            hm,
            yearZhu,
            monthZhu,
            dayZhu,
            timeZhu,
            dun,
            jushu,
            xunshou,
            liuyi,
            zhifu,
            zhishi,
            cells,
            logs
        }
    }

    return {main}
}


module.exports = qimen