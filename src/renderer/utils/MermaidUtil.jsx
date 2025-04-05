import mermaid from 'mermaid';
import * as d3 from 'd3';


const DEFAULT_NODE_STYLE={
    Color:"White",
    StrokeWidth:"3px",
    Stroke:"hsl(40.5882352941, 60%, 83.3333333333%)"
};


export default class MermaidUtil {
    constructor() {
        // 初始化 Mermaid
        mermaid.initialize({
            startOnLoad: false,
            theme: 'default'
        });

        this.name="mermaidChart";
        this.setOneNodeStyle=this.setOneNodeStyle.bind(this);
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
            };
            
            functionHandler(outData);
         });
       
    }

    ///@param[in] htmlNodeElement
    ///@param[in] oneNodeStyle   例子 { "Color":"White","Stroke":"black" }
    ///@param[in] use_default   如果没有提供内容，是否使用默认值
    setOneNodeStyle=(htmlNodeElement,oneNodeStyle)=>
    {
        if("Color" in oneNodeStyle)
        {
            htmlNodeElement.select('rect').style('fill', oneNodeStyle["Color"]);
        }
        else 
        {
            htmlNodeElement.select('rect').style('fill', DEFAULT_NODE_STYLE["Color"]);
        }
        
        if("StrokeWidth" in oneNodeStyle)
        {
            htmlNodeElement.select('rect').style('stroke-width', oneNodeStyle["StrokeWidth"]);
        }
        else 
        {
            htmlNodeElement.select('rect').style('stroke-width', DEFAULT_NODE_STYLE["StrokeWidth"]);
        }
     
        if("Stroke" in oneNodeStyle)
        {
            htmlNodeElement.select('rect').style('stroke', oneNodeStyle["Stroke"]);
        }
        else 
        {
            htmlNodeElement.select('rect').style('stroke', DEFAULT_NODE_STYLE["Stroke"]);
        }
    }


    fetchData=async(filePath)=> {
        let jsonObject={};
        // You can await here
        try {
            const fileContent = await window.electronAPI.mainFileProc.loadFile(filePath);
            //console.log("fileContent: "+fileContent);
            jsonObject = JSON.parse(fileContent);
        } catch (error) {
            jsonObject={};
        }
       
        return jsonObject;
    }

    //
    setColorFromJsonFile=async(jsonFilePath)=>{

        const jsonObject=await this.fetchData(jsonFilePath);

        const select_str='#'+this.name;
        const nodes = d3.select(select_str).selectAll('.node'); 
       
        const setOneNodeStyle=this.setOneNodeStyle;
        nodes.each(function(d) {
            const nodeElement = d3.select(this);
            const buttonName = nodeElement.select('.nodeLabel').text();

            if(jsonObject && buttonName in jsonObject)
            {
                const configElem=jsonObject[buttonName];
                //alert(configElem);
                setOneNodeStyle(nodeElement,configElem);
            }
           
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