import React ,{useRef, useEffect}  from 'react'
import {loadModules} from "esri-loader"

function Map() {

    const MapEl =useRef(null)

    useEffect(
        ()=>{
            let view;
        loadModules(["esri/views/MapView","esri/WebMap","esri/layers/FeatureLayer","esri/widgets/Legend"],{
            css:true
            }).then(([MapView,WebMap,FeatureLayer,Legend])=>{
                const webmap = new WebMap({
                    basemap :'topo-vector'
                })
                // Set view map
                view = new MapView({
                    map: webmap,
                    center:[105.86095781704834, 20.99293496612511],
                    zoom:8,
                    container: MapEl.current
                })
                // Add featurelayer 1
                const featurelayer1 = new FeatureLayer({
                    url:"https://services5.arcgis.com/ke3zI8mXhl0IPTU5/arcgis/rest/services/TDQG/FeatureServer/0",
                    renderer: {
                        type: "simple", // autocasts as new SimpleRenderer()
                        symbol: {
                            type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
                            size: 5,
                            color: [0, 255, 255],
                            outline: null
                        }

                    
                    },
                    labelingInfo:{
                        symbol: {
                            type: "text",  // autocasts as new TextSymbol()
                            color: [0, 255, 255],
                            font: {  // autocast as new Font()
                              family: "Arial",
                              size: 10,
                              weight: "bold"
                            }
                          },
                          labelPlacement: "above-center",
                          labelExpressionInfo: {
                            expression: "$feature.Name"
                          }
                    }
                });
                webmap.add(featurelayer1,0)

                // Add featurelayer 2
                const featurelayer2 = new FeatureLayer({
                    url:"https://services5.arcgis.com/ke3zI8mXhl0IPTU5/arcgis/rest/services/DCQG/FeatureServer/0",
                    renderer: {
                        type: "simple", // autocasts as new SimpleRenderer()
                        symbol: {
                            type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
                            size: 5,
                            color: [255, 0, 0],
                            outline: null
                        }


                    },
                    labelingInfo:{
                        symbol: {
                            type: "text",  // autocasts as new TextSymbol()
                            color: [255, 0, 0],
                            font: {  // autocast as new Font()
                              family: "Arial",
                              size: 10,
                              weight: "bold"
                            }
                          },
                          labelPlacement: "above-center",
                          labelExpressionInfo: {
                            expression: "$feature.Name"
                          }
                    }
                });
                webmap.add(featurelayer2,1)

                let legend = new Legend({
                    view: view, 
                    layerInfos:[
                                                         
                        {
                            title: "TDQG",
                            layer: featurelayer1
                        
                        },
                        {
                            title: "DCQG",
                            layer: featurelayer2,
                            
                        }
                        
                    ]
                                       
                  });
                  
                  view.ui.add(legend, "bottom-right");
            })
            
            

        return  ()=>{
                if (!!view){
                    view.destroy()
                    view = null
    
                }
            }
            
        })
        //Return html tag:    
        return (
        <div id="map" style={{height:'100vh'}} ref={MapEl}>

        </div>
        )
}
      
    

export default Map 