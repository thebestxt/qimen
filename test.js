const qimen = require('./index')
const fs = require('fs')
const moment = require('moment')

// console.log('qimen.res', qimen())
let ts = new Date('2025-01-01 00:00:00').getTime()
let tsEnd = new Date('2025-12-31 23:59:59').getTime()

function json2Str(qm) {
    return [
        `时柱 ${qm.timeZhu}`,
        `日柱 ${qm.dayZhu}`,
        `月柱 ${qm.monthZhu}`,
        `年柱 ${qm.yearZhu}`,
        `日期 ${qm.ym}`,
        `阴历 ${qm.dateLunar}`,
        `时间 ${qm.hm}`,
        `遁 ${qm.dun}${qm.jushu}`,
        `旬首 ${qm.xunshou}（${qm.liuyi}）`,
        `值符 ${qm.zhifu}`,
        `值使 ${qm.zhishi}`,
        '',
        '',
        ...qm.cells.map(v => [
            `${v.bagua}${v.gong}`,
            `八神：${v.bashen}`,
            `${v.kong ? '空' : ''} ${v.ma ? '马' : ''}`,
            v.zhonggongdipan ? `中宫地盘：${v.zhonggongdipan}` : '',
            `八门：${v.bamen}`,
            `天盘干：${v.tianpangan}`,
            `值符九星：${v.zhifujiuxing}`,
            `地盘奇仪：${v.dipanqiyi}`
        ].join("\n"))
    ].join("\n")
}
// while(ts < tsEnd) {
//     const _qimen = qimen().main(new Date(ts))

//     fs.writeFileSync(`./dist/${moment(ts).format('YYYY-MM-DD HH:mm')}.txt`, json2Str(_qimen))

//     ts += 3600000
// }

const _qimen = qimen().main(new Date('2026/5/27 14:55'))
console.log(_qimen);

