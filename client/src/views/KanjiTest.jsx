import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import './KanjiTest.css'
import Timer from '../components/Timer'
import Modal from '../components/Modal'
import Spinner from '../components/Spinner'

const KanjiTest = () => {

    // url params
    const [searchParams] = useSearchParams()
    const employeeName = searchParams.get(`employeeName`)
    const employeeNumber = searchParams.get(`employeeNumber`)
    const employeeHireDate = searchParams.get(`employeeHireDate`)
    
    // initial render
    const kanjiDictionary = {
        "機能": "きのう",
        "失敗": "しっぱい",
        "追加": "ついか",
        "設計": "せっけい",
        "開発": "かいはつ",
        "説明": "せつめい",
        "有効": "ゆうこう",
        "起動": "きどう",
        "処理": "しょり",
        "環境": "かんきょう",
        "稼動": "かどう",
        "作業": "さぎょう",
        "選択": "せんたく",
        "操作": "そうさ",
        "変更": "へんこう",
        "動作": "どうさ",
        "手順": "てじゅん",
        "表示": "ひょうじ",
        "導入": "どうにゅう",
        "種類": "しゅるい",
        "別途": "べっと",
        "技術": "ぎじゅつ",
        "設定": "せってい",
        "確認": "かくにん",
        "接続": "せつぞく",
        "区別": "くべつ",
        "削除": "さくじょ",
        "構成": "こうせい",
        "仕組み": "しくみ",
        "役割": "やくわり",
        "工数": "こうすう",
        "検索": "けんさく",
        "重要": "じゅうよう",
        "実行": "じっこう",
        "条件": "じょうけん",
        "変数": "へんすう",
        "形式": "けいしき",
        "複雑": "ふくざつ",
        "変換": "へんかん",
        "関数": "かんすう",
        "演算子": "えんざんし",
        "並び順": "ならびじゅん",
        "保証": "ほしょう",
        "結果": "けっか",
        "排除": "はいじょ",
        "件数": "けんすう",
        "深刻": "しんこく",
        "画面": "がめん",
        "修正": "しゅうせい",
        "格納": "かくのう",
        "登録": "とうろく",
        "正規化": "せいきか",
        "結合": "けつごう",
        "参照": "さんしょう",
        "定義": "ていぎ",
        "制限": "せいげん",
        "更新": "こうしん",
        "作成": "さくせい",
        "備考": "びこう",
        "比較": "ひかく",
        "取得": "しゅとく",
        "影響": "えいきょう",
        "評価": "ひょうか",
        "概念": "がいねん",
        "索引": "さくいん",
        "順序": "じゅんじょ",
        "構造": "こうぞう",
        "指定": "してい",
        "情報": "じょうほう",
        "詳細": "しょうさい",
        "権限": "けんげん",
        "切断": "せつだん",
        "仕様": "しよう",
        "中身": "なかみ",
        "理解": "りかい",
        "位置": "いち",
        "文字列": "もじれつ",
        "空白": "くうはく",
        "転送": "てんそう",
        "通信": "つうしん",
        "判断": "はんだん",
        "原則": "げんそく",
        "検討": "けんとう",
        "構築": "こうちく",
        "配置": "はいち",
        "状況": "じょうきょう",
        "制御": "せいぎょ",
        "統合": "とうごう",
        "参考": "さんこう",
        "優先": "ゆうせん",
        "配布": "はいふ",
        "複数": "ふくすう",
        "解決": "かいけつ",
        "付加": "ふか",
        "完全": "かんぜん",
        "範囲": "はんい",
        "規則": "きそく",
        "違反": "いはん",
        "組み合わせ": "くみあわせ",
        "所属": "しょぞく",
    }  
    const groups = []
    let group = []
    Object.entries(kanjiDictionary).forEach(([kanji, hiragana], index) => {
        group.push(
            <div className="item" key={index}>
                <div className="index_item">{index + 1}</div>
                <div className="kanji_item">{kanji}</div>
                <div className="hiragana_item" onClick={() => focusItem(index)}></div>
            </div>
        )

        if (index % 25 === 24 || index === Object.entries(kanjiDictionary).length - 1) {
            groups.push(
                <div className="group" key={groups.length}>
                    <div className="header">
                        <div className="index_header">NO</div>
                        <div className="kanji_header">漢字</div>
                        <div className="hiragana_header">テスト</div>
                    </div>
                    {group}
                </div>
            )
            group = []
        }
    })

    // focus module
    // const [focusedIndex, setFocusedIndex] = useState(0)
    const focusItem = (index) => {
        const hiraganaItems = document.querySelectorAll(`.hiragana_item`)
        const float = document.querySelector(`.float`)
        // setFocusedIndex(index)
        // document.querySelectorAll(`.hiragana_item`)[index].scrollIntoView({ behavior: `smooth`, block: `center` })
        hiraganaItems.forEach((item) => {
            if (item.style.backgroundColor === `aqua`) {
                item.style.backgroundColor = `unset`
                item.id = `unset`
            }
        })
        hiraganaItems[index].style.backgroundColor = "aqua"
        hiraganaItems[index].id = `focused`
        const rect = hiraganaItems[index].getBoundingClientRect()
        float.textContent = ``
        float.style.visibility = `visible`
        float.style.top = `${rect.top}px`
        float.style.left = `${rect.left + 90}px`
    }

    // input module
    const inputDictionary = {
        // Basic vowels
        "a": "あ", "i": "い", "u": "う", "e": "え", "o": "お",

        // K consonant
        "ka": "か", "ki": "き", "ku": "く", "ke": "け", "ko": "こ",
        "kya": "きゃ", "kyu": "きゅ", "kyo": "きょ",

        // S consonant
        "sa": "さ", "shi": "し", "si": "し", "su": "す", "se": "せ", "so": "そ",
        "sha": "しゃ", "shu": "しゅ", "sho": "しょ",
        "sya": "しゃ", "syu": "しゅ", "syo": "しょ",

        // T consonant
        "ta": "た", "chi": "ち", "ti": "ち", "tsu": "つ", "tu": "つ", "te": "て", "to": "と",
        "cha": "ちゃ", "chu": "ちゅ", "cho": "ちょ",
        "tya": "ちゃ", "tyu": "ちゅ", "tyo": "ちょ",
        "cya": "ちゃ", "cyu": "ちゅ", "cyo": "ちょ",
        "tsa": "つぁ", "tsi": "つぃ", "tse": "つぇ", "tso": "つぉ",

        // N consonant
        "na": "な", "ni": "に", "nu": "ぬ", "ne": "ね", "no": "の",
        "nya": "にゃ", "nyu": "にゅ", "nyo": "にょ",

        // H consonant
        "ha": "は", "hi": "ひ", "fu": "ふ", "hu": "ふ", "he": "へ", "ho": "ほ",
        "hya": "ひゃ", "hyu": "ひゅ", "hyo": "ひょ",

        // M consonant
        "ma": "ま", "mi": "み", "mu": "む", "me": "め", "mo": "も",
        "mya": "みゃ", "myu": "みゅ", "myo": "みょ",

        // Y consonant
        "ya": "や", "yu": "ゆ", "yo": "よ",

        // R consonant
        "ra": "ら", "ri": "り", "ru": "る", "re": "れ", "ro": "ろ",
        "rya": "りゃ", "ryu": "りゅ", "ryo": "りょ",

        // W consonant
        "wa": "わ", "wo": "を",

        // N consonant (special)
        "nn": "ん",

        // G consonant
        "ga": "が", "gi": "ぎ", "gu": "ぐ", "ge": "げ", "go": "ご",
        "gya": "ぎゃ", "gyu": "ぎゅ", "gyo": "ぎょ",

        // Z consonant
        "za": "ざ", "ji": "じ", "zi": "じ", "zu": "ず", "ze": "ぜ", "zo": "ぞ",
        "ja": "じゃ", "ju": "じゅ", "jo": "じょ",
        "jya": "じゃ", "jyu": "じゅ", "jyo": "じょ",

        // D consonant
        "da": "だ", "di": "ぢ", "du": "づ", "de": "で", "do": "ど",
        "dya": "ぢゃ", "dyu": "ぢゅ", "dyo": "ぢょ",

        // B consonant
        "ba": "ば", "bi": "び", "bu": "ぶ", "be": "べ", "bo": "ぼ",
        "bya": "びゃ", "byu": "びゅ", "byo": "びょ",

        // P consonant
        "pa": "ぱ", "pi": "ぴ", "pu": "ぷ", "pe": "ぺ", "po": "ぽ",
        "pya": "ぴゃ", "pyu": "ぴゅ", "pyo": "ぴょ",

        // Additional sounds
        "fa": "ふぁ", "fi": "ふぃ", "fe": "ふぇ", "fo": "ふぉ", "fyu": "ふゅ",
        "va": "ゔぁ", "vi": "ゔぃ", "vu": "ゔ", "ve": "ゔぇ", "vo": "ゔぉ",
        "wi": "うぃ", "we": "うぇ", "wo": "うぉ",
        "kwa": "くぁ", "kwi": "くぃ", "kwu": "くぅ", "kwe": "くぇ", "kwo": "くぉ",
        "gwa": "ぐぁ", "gwi": "ぐぃ", "gwu": "ぐぅ", "gwe": "ぐぇ", "gwo": "ぐぉ",

        // Small vowels for foreign sounds
        "la": "ぁ", "li": "ぃ", "lu": "ぅ", "le": "ぇ", "lo": "ぉ",
        "qa": "くぁ", "qi": "くぃ", "qu": "くぅ", "qe": "くぇ", "qo": "くぉ",

        // Additional combinations
        "she": "しぇ", "je": "じぇ", "che": "ちぇ", "tsyu": "つゅ",
        "zwi": "ずぃ", "dze": "ぢぇ", "dzi": "ぢぃ", "dyi": "ぢぃ",
        "syi": "しぃ", "jyi": "じぃ", "tyi": "ちぃ",

        // More
        "lya": "ゃ", "lyu": "ゅ", "lye": "ぇ", "lyo": "ょ",
        "-": "ー",
        "ltu": "っ",

        // Doubled consonants
        "kka": "っか", "kki": "っき", "kku": "っく", "kke": "っけ", "kko": "っこ",
        "ssa": "っさ", "sshi": "っし", "ssi": "っし", "ssu": "っす", "sse": "っせ", "sso": "っそ",
        "tta": "った", "tchi": "っち", "tti": "っち", "ttsu": "っつ", "ttu": "っつ", "tte": "って", "tto": "っと",
        "ppa": "っぱ", "ppi": "っぴ", "ppu": "っぷ", "ppe": "っぺ", "ppo": "っぽ",
        "ffa": "っふぁ", "ffi": "っふぃ", "ffu": "っふ", "ffe": "っふぇ", "ffo": "っふぉ",
        "gga": "っが", "ggi": "っぎ", "ggu": "っぐ", "gge": "っげ", "ggo": "っご",
        "bba": "っば", "bbi": "っび", "bbu": "っぶ", "bbe": "っべ", "bbo": "っぼ",
        "dda": "っだ", "ddi": "っぢ", "ddu": "っづ", "dde": "っで", "ddo": "っど",
        "zza": "っざ", "jji": "っじ", "zzi": "っじ", "zzu": "っず", "zze": "っぜ", "zzo": "っぞ",

        // Doubled consonants with y
        "kkya": "っきゃ", "kkyu": "っきゅ", "kkyo": "っきょ",
        "ssya": "っしゃ", "ssyu": "っしゅ", "ssyo": "っしょ",
        "ttya": "っちゃ", "ttyu": "っちゅ", "ttyo": "っちょ",
        "ppya": "っぴゃ", "ppyu": "っぴゅ", "ppyo": "っぴょ",
        "hhya": "っひゃ", "hhyu": "っひゅ", "hhyo": "っひょ",
        "mmya": "っみゃ", "mmyu": "っみゅ", "mmyo": "っみょ",
        "rrya": "っりゃ", "rryu": "っりゅ", "rryo": "っりょ",
        "ggya": "っぎゃ", "ggyu": "っぎゅ", "ggyo": "っぎょ",
        "bbya": "っびゃ", "bbyu": "っびゅ", "bbyo": "っびょ",
        "ddya": "っぢゃ", "ddyu": "っぢゅ", "ddyo": "っぢょ",
        "jjya": "っじゃ", "jjyu": "っじゅ", "jjyo": "っじょ",

        // More doubled consonants
        "hha": "っは", "hhi": "っひ", "hhu": "っふ", "hhe": "っへ", "hho": "っほ",
        "mma": "っま", "mmi": "っみ", "mmu": "っむ", "mme": "っめ", "mmo": "っも",
        "yya": "っや", "yyu": "っゆ", "yyo": "っよ",
        "rra": "っら", "rri": "っり", "rru": "っる", "rre": "っれ", "rro": "っろ",
        
        // More combinations with small vowels and consonants
        "lka": "ヵ", "lke": "ヶ", "xa": "ぁ", "xi": "ぃ", "xu": "ぅ", "xe": "ぇ", "xo": "ぉ",
        "xka": "ヵ", "xke": "ヶ", "xtsu": "っ", "xtu": "っ",
        "xya": "ゃ", "xyu": "ゅ", "xyo": "ょ",

        // Extended sounds for completeness
        "wu": "う",
    }
    const handleKeyDown = (event) => {
        const float = document.querySelector(`.float`)
        const hiraganaItems = document.querySelectorAll(`.hiragana_item`)
        const focusedItem = document.querySelector(`#focused`)
        if (focusedItem === null) {
            return
        }
        if (event.key === `Backspace`) {
            if (float.textContent.length > 0) {
                float.textContent = float.textContent.slice(0, -1)
            } else {
                focusedItem.textContent = focusedItem.textContent.slice(0, -1)
            }
        } 
        if (event.key === `Tab` || event.key === `ArrowDown`) {
            event.preventDefault()
            if (Array.from(hiraganaItems).indexOf(focusedItem) < 99) {
                focusItem(Array.from(hiraganaItems).indexOf(focusedItem) + 1)
            }
        }
        if (event.key === `ArrowUp`) {
            if (Array.from(hiraganaItems).indexOf(focusedItem) > 0) {
                focusItem(Array.from(hiraganaItems).indexOf(focusedItem) - 1)
            }
        }
        if (event.key === `ArrowLeft`) {
            if (Array.from(hiraganaItems).indexOf(focusedItem) > 24) {
                focusItem(Array.from(hiraganaItems).indexOf(focusedItem) - 25)
            }
        }
        if (event.key === `ArrowRight`) {
            if (Array.from(hiraganaItems).indexOf(focusedItem) < 75) {
                focusItem(Array.from(hiraganaItems).indexOf(focusedItem) + 25)
            }
        }
        if (/^[a-z\-]+$/.test(event.key)) {
            float.textContent += event.key
        }
        if (float.textContent in inputDictionary) {
            focusedItem.textContent += inputDictionary[float.textContent]
            float.textContent = ``
        }
        if (float.textContent.length > 4) {
            float.textContent = ``
        }
        if (focusedItem.textContent.length > 10) {
            focusedItem.textContent = focusedItem.textContent.slice(0, -1)
        }
    }
    useEffect(() => {
        document.addEventListener(`keydown`, handleKeyDown)
        return () => document.removeEventListener(`keydown`, handleKeyDown)
    }, [])

    // scoring module
    const [scoreValue, setScoreValue] = useState(0) 
    const score = () => {
        let score = 0
        const hiraganaItems = document.querySelectorAll(`.hiragana_item`)
        Object.entries(kanjiDictionary).forEach((entry, index) => {
            if (entry[1] === hiraganaItems[index].textContent) {
                score++
            } else {
                hiraganaItems[index].style.backgroundColor = `lightcoral`
            }
        })
        setScoreValue(score)
        setMessage(`採点結果、あなたの点数は${score}点です。提出してよろしいですか？`)
        setIsVisible(true)
    }

    // modal module
    const [message, setMessage] = useState(``)
    const [isVisible, setIsVisible] = useState(false)
    const closeModal = () => setIsVisible(false)

    // timer id
    const [timerId, setTimerId] = useState(null)

    // return home
    const home = () => {
        window.location.href = `/`
    }

    //spinner module
    const [isSpinnerVisible, setSpinnerVisible] = useState(false)

    return (
        <>
            <div class="kanji_test">
                <div class="top">
                    <div class="top_left">仕様書でよく使う漢字１</div>
                    <div class="top_right">
                        <div class="time">
                            <div class="time_label">経過時間</div>
                            <Timer setTimerId={setTimerId} />
                        </div>
                        <div class="score">
                            <div class="score_label">点数</div>
                            <div class="score_value">{scoreValue}</div>
                        </div>
                    </div>
                </div>
                <div className="center">{groups}</div>
                <div class="bottom">
                    <div class="bottom_left">
                        <button class="return_button" onClick={home}>戻る</button>
                    </div>
                    <div class="bottom_right">
                        <button class="submit_button" onClick={score}>提出</button>
                    </div>
                </div>
            </div>        
            <div class="float"></div>
            <Modal 
                message={message} 
                scoreValue={scoreValue} 
                isVisible={isVisible} 
                onClose={closeModal} 
                employeeName={employeeName}
                employeeNumber={employeeNumber}
                employeeHireDate={employeeHireDate}
                timerId={timerId}
                setSpinnerVisible={setSpinnerVisible}
            />
            <Spinner isSpinnerVisible={isSpinnerVisible} />
        </>
    )
}

export default KanjiTest