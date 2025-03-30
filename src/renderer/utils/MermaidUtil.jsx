import mermaid from 'mermaid';


export default class MermaidUtil {
    constructor() {
        // 初始化 Mermaid
        mermaid.initialize({
            startOnLoad: false,
            theme: 'default'
        });
    }


    genMermaidChart = async (filePath) => {
        let retSvgCode="";
        try {
           
            //console.log("filePath: "+filePath);
            let curFileContent= await window.electronAPI.mainFileProc.loadFile(filePath)
            //console.log("curFileContent: "+curFileContent);
            const svgObj= await mermaid.render('mermaidChart', curFileContent);
            retSvgCode=svgObj.svg;
            
            //console.log("mermaidContainerRef.current: "+mermaidContainerRef.current);
        } catch (err) {
            console.error(err);
        }

        return retSvgCode;
    };

  
}