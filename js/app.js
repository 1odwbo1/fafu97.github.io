require([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/Legend",
    "esri/widgets/ScaleBar",
    "esri/widgets/Search",
    "esri/widgets/LayerList",
    "esri/widgets/BasemapGallery",
    "esri/layers/TileLayer",
    "esri/Basemap",
    "esri/widgets/Expand"
  ], function(
    Map, MapView, Legend, ScaleBar, Search, LayerList, 
    BasemapGallery, TileLayer, Basemap, Expand
  ) {
    // 创建一个专题图层（世界人口密度）
    const populationLayer = new TileLayer({
      url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Population_Density/MapServer",
      title: "世界人口密度"
    });
  
    // 创建一个自定义底图
    const customBasemap = new Basemap({
      baseLayers: [
        new TileLayer({
          url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer",
          title: "世界地形图"
        })
      ],
      title: "自定义地形图",
      id: "my-custom-basemap"
    });
  
    // 创建地图实例
    const map = new Map({
      basemap: "streets-navigation-vector",
      layers: [populationLayer]
    });
  
    // 创建视图实例
    const view = new MapView({
      container: "viewDiv",
      map: map,
      center: [0, 20], // 经度, 纬度
      zoom: 3
    });
  
    // 添加比例尺微件
    const scaleBar = new ScaleBar({
      view: view,
      unit: "metric"
    });
    view.ui.add(scaleBar, {
      position: "bottom-left"
    });
  
    // 添加图例微件
    const legend = new Legend({
      view: view
    });
    view.ui.add(legend, "top-right");
  
    // 添加搜索微件
    const search = new Search({
      view: view
    });
    view.ui.add(search, {
      position: "top-left",
      index: 0
    });
  
    // 添加图层列表微件
    const layerList = new LayerList({
      view: view
    });
    const layerListExpand = new Expand({
      view: view,
      content: layerList,
      expandIconClass: "esri-icon-layers",
      expandTooltip: "图层列表"
    });
    view.ui.add(layerListExpand, "top-right");
  
    // 添加底图库微件
    const basemapGallery = new BasemapGallery({
      view: view,
      source: [
        "streets-vector",
        "satellite",
        "hybrid",
        "topo-vector",
        "dark-gray-vector",
        "navigation-vector",
        customBasemap
      ]
    });
    document.getElementById("basemapGalleryDiv").appendChild(basemapGallery.domNode);
  
    // 视图加载完成后执行
    view.when(() => {
      console.log("地图视图加载完成");
    });
  });