import personDataObj from "./dataObj.js"

let buttonElm = createElement('button', 'langChange')
buttonElm.textContent = 'Switch to LT'
let main = document.querySelector('.main-info')
main.prepend(buttonElm)
let langDefault = 'eng'

renderCv(langDefault)
buttonElm.addEventListener("click", () => {
    main.innerHTML=''
    let lang = langSwitch()
    renderCv(lang)
})

function renderCv(lang){
    let personalInfo = document.querySelector('.personal-info')
    personalInfo.innerHTML=''

    let { skills, hobbies, languages, personalDetails, education, employment } = personDataObj[lang]

    let langArr = languages.languageList
    let langNewArr = langArr.map(element => {
        let langItem = document.createElement('div')
        langItem.classList.add('language-item')
        langItem.innerHTML = `<p class="text">${element.name}</p>`

        let langDotDivElm = document.createElement('div')
        langDotDivElm.classList.add('dot-wrap')
        for (let i = 1; i <= element.level; i++) {
            let spanElmColored = document.createElement('span')
            spanElmColored.classList.add('lang-dot-colored')
            langDotDivElm.append(spanElmColored)
        }
        if (element.level < 5) {
            for (let i = 1; i <= (5 - element.level); i++) {
                let spanElmUncolored = document.createElement('span')
                spanElmUncolored.classList.add('lang-dot-uncolored')
                langDotDivElm.append(spanElmUncolored)
            }
        }
        langItem.append(langDotDivElm)

        return langItem

    });
    let nameTitleElm = createElement('h1', 'name')
    nameTitleElm.textContent = personalDetails.name + ' ' + personalDetails.surname

    let educationWrap = createElement('div', 'education-wrap')
    let educationArr = education.educationList
    educationArr.map(item => {
        let { study, date, school } = item
        let educationItem = createElement('div', 'education-item')
        educationItem.innerHTML=`
        <h4 class="item-title">${study}</h4>
        <p class="item-date">${date}</p>
        <p class="item-company">${school}</p>`
        educationWrap.append(educationItem)
    })

    let employmentWrap = createElement('div', 'employment-Wrap')
    let employmentArr = employment.employmentList
    employmentArr.map(item => {
        let { company, date, info, profession } = item
        let employmentItem = createElement('div', 'employment-item')
        employmentItem.innerHTML =`
        <h4 class="item-title">${profession}</h4>
        <p class="item-date">${date}</p>
        <p class="item-company">${company}</p>
        <p class="item-info">${info}</p>`
        employmentWrap.append(employmentItem)
    })

    console.log(createPersonDetail(lang))
    personalInfo.append(
        createPersonDetail(lang),
        createList(skills.title, skills.skillList),
        createList(languages.title, langNewArr),
        createList(hobbies.title, hobbies.hobbiesList),
    )
    main.prepend(
        buttonElm,
        nameTitleElm,
        createTitle(education.title),
        educationWrap,
        createTitle(employment.title),
        employmentWrap,
    )
}


function createDetailItem(text, imgName) {
    let src = `./CVIcons/${imgName}.svg`
    let itemElm = document.createElement('div')
    itemElm.classList.add('item')
    itemElm.innerHTML = `
    <img width="20px" src=${src} alt="icon">
    <p class="text">${text}</p>
    `
    return itemElm
}
function createTitle(text) {
    let titleElm = document.createElement('h2')
    titleElm.textContent = text
    titleElm.classList.add('title')
    return titleElm
}
function langSwitch() {
    if (langDefault === 'eng') {
        langDefault = 'lt'
        buttonElm.textContent = 'Switch to ENG'
    }
    else if (langDefault == 'lt') {
        langDefault = 'eng'
        buttonElm.textContent = 'Switch to LT'
    }
    return langDefault
}
function createList(title, array){
    const divElm = document.createElement('div')
    divElm.classList.add(title + '-wrapper')
    divElm.innerHTML = ''
    let ulElm = document.createElement('ul')
    array.map(item => {
        let liElm = document.createElement('li')
        liElm.append(item)
        ulElm.append(liElm)
    });
    divElm.append(createTitle(title), ulElm)
    return divElm
}
function createPersonDetail(lang){
    let { title, name, surname, gender, email, phone, address, linkedIn, gitHub, driversLicense, dateOfBirth } = personDataObj[lang].personalDetails
    const prsDetailElm = document.createElement('div')
    prsDetailElm.classList.add('personal-details-wrapper')
    prsDetailElm.innerHTML = ''
    prsDetailElm.append(
        createTitle(title),
        createDetailItem(name + ' ' + surname, 'Person'),
        createDetailItem(dateOfBirth, 'Date'),
        createDetailItem(gender, 'Gender'),
        createDetailItem(email, 'Mail'),
        createDetailItem(phone, 'Phone'),
        createDetailItem(address, 'Address'),
        createDetailItem(linkedIn, 'Linked'),
        createDetailItem(gitHub, 'Page'),
        createDetailItem(driversLicense, 'Car'),
    )
    return prsDetailElm
}
function createElement(elementType, elementClass) {
    let element = document.createElement(elementType)
    element.classList.add(elementClass)
    return element
}
