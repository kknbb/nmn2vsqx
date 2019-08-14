const fs = require('fs')
const tp = require('./template')

class VsqxGenerator {
    constructor() {
        this.baseLength = 1920,  //全音符长度
        this.base_pitch = 60  //以国际记谱法C3为基准 1=C3, vocaloid中C3对应60
        this.keysMapChart = {  //调号对应音高偏移量
            'C': 0,
            '#C': 1,
            'D': 2,
            '#D': 3,
            'E': 4,
            'F': 5,
            '#F': 6,
            'G': 7,
            '#G': 8,
            'A': 9,
            '#A': 10,
            'B': 11,
            'bB': -2,
            'bA': -4,
            'bG': -6,
            'bE': -9,
            'bD': -11
        }
        this.numberChart = {  //简谱数字对应音高偏移量
            1: 0,
            2: 2,
            3: 4,
            4: 5,
            5: 7,
            6: 9,
            7: 11
        }
        this.rawData = {}
        this.fileContent = ``
    }
    
    strReplace(str, args) { //[re, targetStr]
        let res = str
        args.map(i => {
            res = res.replace(i[0], i[1])
        })
        return res
    }

    readFile() {
        try {
            const content = fs.readFileSync('music.json')
            this.rawData = JSON.parse(content)
        } catch (err) {
            console.log(err)
        }
    }

    //<%-TEMPO-%> 速度
    //<%-BEAT_COUNT-%> 每小节x拍
    //<%-BEAT_TYPE-%> 以x分音符为一拍
    //<%-NOTES-%> 音符区域
    //<%-NOTE_START-%> 音符开始时间
    //<%-NOTE_LENGTH-%> 音符时值
    //<%-NOTE_PITCH-%> 音高
    parseRawData() {
        const {
            tempo,
            beat,
            key,
            notes
        } = this.rawData
        const [BEAT_COUNT, BEAT_TYPE] = [...beat.split('/')]
        let baseStr_file = tp.template_file
        let baseStr_notes = ''
        const notesArray = []
        const currentKey_C = this.base_pitch + this.keysMapChart[key]  //基于调号的C音
        let note_start_count = 0
        notes.map(note => {
            let template = tp.template_note
            const NOTE_START = note_start_count
            const NOTE_LENGTH = this.computed_length(note.type)
            if (note.type[0] == "s") { //如果是休止符只计算时长
                note_start_count += NOTE_LENGTH    
            } else {
                const NOTE_PITCH = this.computed_pitch(currentKey_C , note.pitch, note.multiples)
                const args = [
                    [/<%-NOTE_START-%>/, NOTE_START],
                    [/<%-NOTE_LENGTH-%>/, NOTE_LENGTH],
                    [/<%-NOTE_PITCH-%>/, NOTE_PITCH]
                ]
                note_start_count += NOTE_LENGTH
                notesArray.push(this.strReplace(template, args))
                console.log(NOTE_START, NOTE_LENGTH, NOTE_PITCH, note_start_count)
            }
        })

        notesArray.map(noteStr => {  //把note补分拼接
            baseStr_notes += noteStr
        })

        const replace_args = [
            [/<%-TEMPO-%>/, tempo*100],
            [/<%-BEAT_COUNT-%>/, BEAT_COUNT],
            [/<%-BEAT_TYPE-%>/, BEAT_TYPE],
            [/<%-NOTES-%>/, baseStr_notes]
        ]

        this.fileContent = this.strReplace(baseStr_file, replace_args)

    }

    computed_length(type) {
        /*
        const base = type.split('.')[0]
        let length = this.baseLength / parseInt(base)
        if (type.includes('.')) {
            return length + length / 2
        } else {
            return length
        }
        */
       const part = type.match(/[0-9]+/)[0]
       let length = this.baseLength / parseInt(part)
       if (type.includes('.')) {
            return length + length / 2
        } else {
            return length
        }
    }

    computed_pitch(currentKey_C, pitch, multiples) {
        let sign, number
        if (pitch.length > 1) { //先判断有没有升降号
            sign = pitch[0] // 获取升降号
            number = parseInt(pitch.slice(1))  //获取数字部分
        } else {
            number = parseInt(pitch)
        }

        let add = 0 //升降号基准
        let mul = 0 //高低音点
        if (sign == '#') {
            add = 1
        } else if (sign == 'b') {
            add = -1
        }
        if (multiples) {
            mul = multiples * 12
        }
        return currentKey_C + mul + this.numberChart[number] + add
    }

    writeFile() {
        try {
            fs.writeFile('result.vsqx', this.fileContent, err => {
                if (err) {
                    console.log('failed')
                }
                console.log('sucess')
            })
        } catch (err) {
            console.log(err)
        }
    }

    toWork() {
        this.readFile()
        this.parseRawData()
        this.writeFile()
    }
}

const gener = new VsqxGenerator
gener.toWork()