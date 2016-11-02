import Ember from 'ember';
const {
  Component,
  A: EmberArray,
  set,
  get
} = Ember

const {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  CubeGeometry,
  MeshBasicMaterial,
  Mesh,
  OrbitControls
} = THREE

export default Component.extend({
  size: 128,

  mPlayer: null,
  mScene: null,
  mCamera: null,
  mRenderer: null,
  mAnalyser: null,
  mFrequencies: null,

  mCubes: null,

  ctx: null,
  src: null,

  init () {
    this._super(...arguments)

    set(this, 'mFrequencies',
      new Uint8Array(get(this, 'size')))
    set(this, 'ctx', new AudioContext)
  },
  didInsertElement () {
    this._super(...arguments)

    const player = this.$('#player')[0]
    const ctx = get(this, 'ctx')
    const src = ctx.createMediaElementSource(player)
    const analyser = ctx.createAnalyser()

    const width = $(window).width()
    const height = $(window).height()

    analyser.connect(ctx.destination)
    src.connect(analyser)

    set(this, 'mAnalyser', analyser)
    set(this, 'src', src)


    let scene = new Scene()
    set(this, 'mScene', scene)

    let camera = new PerspectiveCamera(50, width / height, 20, 1000)
    camera.position.z = 100;
    set(this, 'mCamera', camera)

    let renderer = new WebGLRenderer
    renderer.setSize(width,height)
    set(this, 'mRenderer', renderer)
    get(this, 'element').appendChild(renderer.domElement)

    let mCubes = EmberArray()

    get(this, 'mFrequencies').forEach((e, i) => {
      let mGeometry = new CubeGeometry(1.5, 1.5, 1.5)
      let mMaterial = new MeshBasicMaterial({
        color: '#' + Math.floor(Math.random()*16777215).toString(16)
      })
      var cube = new Mesh(mGeometry, mMaterial)
      cube.position.set(i * 2, 0, 0)
      scene.add(cube)
      mCubes.push(cube)
    })
    set(this, 'mCubes', mCubes)

    set(this, 'mControls', new OrbitControls(camera))
    this.draw()
  },
  draw () {
    let renderer = get(this, 'mRenderer')
    let frequencies = get(this, 'mFrequencies')

    get(this, 'mAnalyser').getByteFrequencyData(frequencies)
    get(this, 'mCubes').forEach((cube, index) => {
      let freq = frequencies[index]
      cube.scale.z = freq > 1 ? freq : 1
    })

    renderer.render(get(this, 'mScene'), get(this, 'mCamera'))
    get(this, 'mControls').update()

    window.requestAnimationFrame(this.draw.bind(this))
  }
})
