// import '../style/SvgViews.css';

function dom(type) {
    return document.createElement(type);
}

function SvgsViewDevTools() {
    const wrapDom = dom('div');
    const toast = dom('div');
    toast.className = 'copy-msg-toast v-fixed';
    wrapDom.className = 'vite-plugin-svgs-icons-views';

    const svgsIconToolsDom = dom('div');
    svgsIconToolsDom.className = 'svgs-icons-tools v-fixed';

    const ul = dom('ul');
    const mask = dom('div');
    const copyInput = dom('input');
    copyInput.setAttribute('readonly', 'readonly');
    copyInput.setAttribute('unselectable', 'on');
    copyInput.className = 'copy-input';
    mask.className = 'mask';
    ul.className = 'ul-box';

    const openIcon = dom('div');
    openIcon.className = 'open-icon';
    openIcon.innerHTML = '<svg t="1701447444694" class="open-icon-svg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14436" width="200" height="200"><path d="M850.688 830.72a28.416 28.416 0 0 1-22.016-8.704l-352-315.84a31.552 31.552 0 0 1 0-47.936l352-315.776a32 32 0 0 1 46.208 2.176 31.36 31.36 0 0 1-2.176 45.76l-325.824 291.84 325.824 291.84a31.36 31.36 0 0 1 2.176 45.76 35.52 35.52 0 0 1-24.192 10.88z m-341.248 0a28.416 28.416 0 0 1-22.016-8.704l-352-315.84a31.552 31.552 0 0 1 0-47.936l352-315.776a32 32 0 0 1 46.208 2.176 31.36 31.36 0 0 1-2.176 45.76l-325.824 291.84 325.824 291.84a31.424 31.424 0 0 1 2.176 45.76 35.52 35.52 0 0 1-24.128 10.88z" fill="#333" p-id="14437"></path></svg>';
    if (typeof svgIconNames!=='object') {
        return console.error('isNameVars var set true')
    }
    svgIconNames.map((svgName)=>{
        const li = dom('li');
        li.className = 'svg-icon-item';
        const nameDOM = dom('div');
        nameDOM.className = 'name';
        const spanDOM = dom('span');
        spanDOM.className = 'span-text';
        spanDOM.innerHTML = svgName;

        const svghtml = `
            <svg aria-hidden="true" xmlns:link="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
                <use href="#icona-${svgName}"></use>
            </svg>
        `;
        li.innerHTML = svghtml;
        li.onclick = function(){
            copyInput.value = svgName;
            copyInput.blur();
            copyInput.select();
            copyInput.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(svgName);
            toast.innerHTML = svgName+' copy Suucessify';
            toast.style.top = '15px';
            toast.style.opacity = '1';
            let times = setTimeout(()=>{
                toast.style.top = '-100%';
                toast.style.opacity = '0';
                clearTimeout(times);
            }, 1500);
        }
        nameDOM.appendChild(spanDOM);
        li.appendChild(nameDOM);
        ul.appendChild(li);
    });
    
    Array.from({ length: 4 }).map((it)=>{
        const lie = dom('li');
        lie.className = 'svg-icon-item';
        ul.appendChild(lie);
    });
    let isOpen = false;
    openIcon.onclick = function(){
        isOpen = !isOpen;
        if (isOpen) {
            wrapDom.classList.add('open-status');
            document.body.classList.add('body-100vh');
            return;
        }
        wrapDom.classList.remove('open-status');
        document.body.classList.remove('body-100vh');
    }
    wrapDom.appendChild(mask);
    wrapDom.appendChild(toast);
    wrapDom.appendChild(ul);
    wrapDom.appendChild(openIcon);
    wrapDom.appendChild(copyInput);
    document.body.appendChild(wrapDom);
}

SvgsViewDevTools();