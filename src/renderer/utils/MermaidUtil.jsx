import mermaid from 'mermaid';
import * as d3 from 'd3';

export default class MermaidUtil {
    constructor() {
        // 初始化 Mermaid
        mermaid.initialize({
            startOnLoad: false,
            theme: 'default'
        });

        this.name="mermaidChart"
    }

    showNodeData=(nodeElement)=>{
        const node_text = nodeElement.select('.nodeLabel').text();
        alert(node_text);
    }

    bindListeners=(data,functionHandler)=>{
        
         // 使用 D3.js 添加点击事件
        const select_str='#'+this.name;

        const nodes = d3.select(select_str).selectAll('.node'); 
        
        nodes.on('click', function(event, d) {
            const ButtonName = d3.select(this).select('.nodeLabel').text();
           
            let outData={
                ButtonName:ButtonName
            }
            functionHandler(outData);
         });
       
    }


    unbindListeners=()=>{
        // 使用 D3.js 添加点击事件
       const select_str='#'+this.name;

       const nodes = d3.select(select_str).selectAll('.node'); 
       
       nodes.on('click', null);
      
   }

    genMermaidChart = async (filePath) => {
        let retSvgCode="";
        if(""!=filePath)
        {
          
            try {
               
                //console.log("filePath: "+filePath);
                let curFileContent= await window.electronAPI.mainFileProc.loadFile(filePath)
                //console.log("curFileContent: "+curFileContent);
                const svgObj= await mermaid.render( this.name, curFileContent);
                retSvgCode=svgObj.svg;
    
                
                //console.log("mermaidContainerRef.current: "+mermaidContainerRef.current);
            } catch (err) {
                console.error(err);
            }
    
        }
       
        return retSvgCode;
    };

  
}