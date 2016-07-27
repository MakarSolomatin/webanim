function unit(nmesh, response_func)
{
    this.Mesh = nmesh;
    this.ResponseFunc = function(mesh){response_func(mesh)};
}

function anim()
{
    var self = this;

    self.start = Date.now();

    self.Units = [];
    self.MainScene = new THREE.Scene();
    self.MainCamera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    self.MainRenderer = new THREE.WebGLRenderer({antialias: true});
    self.MainRenderer.setSize(window.innerWidth, window.innerHeight);
    self.time = 0;
    document.body.appendChild(self.MainRenderer.domElement);

    self.CubeCamera = new THREE.CubeCamera(.1, 1000, 512);
    self.CubeCamera.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter;
    self.MainScene.add(self.CubeCamera);

    /*self.SetCubeCamera = function(pos)
    {
      self.CubeCamera = new THREE.CubeCamera(.1, 1000, 512);
      self.CubeCamera.position = pos;
      self.CubeCamera.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter;
      self.MainScene.add(self.CubeCamera);
    };*/

    self.AddMesh = function(geometry, material, response_func)
    {
        mesh = new THREE.Mesh(geometry, material);
        self.Units.push(new unit(mesh, response_func));
        self.MainScene.add(mesh);
    };

    self.AddLight = function(light, npos)
    {
       var l = light;
       l.pos = npos;
       self.MainScene.add(l);
    };

    self.Render = function()
    {
        self.time = (Date.now() - self.start) / 1000.0;

        //self.Units[1].Mesh.visible = false;
        for (var i = 0; i < (self.Units).length; i++)
          self.Units[i].ResponseFunc(self.Units[i].Mesh);
        (self.MainRenderer).render(self.MainScene, self.MainCamera);
         self.MainCamera.rotation.set(0, self.time, 0);

    };

    self.Start = function()
    {
        self.Render();
        window.requestAnimationFrame(self.Start);
    };
}