import React        from 'react';
import Resizable    from 'react-component-resizable';
import ORXLine      from 'partials/orx-line';
import UniteLink    from 'partials/unite-link';
import Cite         from 'partials/cite';
import CodeSample   from 'partials/code-sample';
import Pen          from 'partials/codepen';
import HeftyContent from 'partials/hefty-content';
import More         from 'partials/more';
import PostImage    from 'partials/post-image';
import Gif          from 'partials/gif';
import SocialNetworksAbout from 'social-networks-about';
import DisqusComments from 'disqus-comments';
// const More = require('partials/more');


const ShapePage = new React.createClass({
  getInitialState () { return { isShow: false }; },
  _onResize () { window.dispatchEvent(new Event('resize')) },
  componentWillUnmout () { clearTimeout(this._tm); },
  componentDidMount () {
    this._checkHeight();
    this._tm = setTimeout( () => {
      this.setState({ isShow: true }); this._setRealHeight();
    }, 500) ;
  },
  _checkHeight () {
    const url = sessionStorage.getItem('beforeUnloadURL');
    const height = sessionStorage.getItem('beforeUnloadPostHeight');
    if (url === window.location.href) {
      const el = this.getDOMNode();
      el.style['min-height'] = "#{height}px"
    }
  },
  _setRealHeight () { this.getDOMNode().style['min-height'] = "auto"; },

  render() {
    let content = null;
    if (this.state.isShow) {
      content = <div>
          <div className="post__header"> Burst </div>
          <div className="post__description"> This post is about Burst - modules that help you to bootsrap motion effects with declarative calls.</div>
          <ORXLine className="post__orx-line" />

          <Cite>
            Please make sure you are confortable with <UniteLink link="/tutorials/shape/">Shapes & ShapeSwirl</UniteLink> before proceeding with this tutorial.
          </Cite>

          <h2> Burst </h2>
          
          <p>
            <span className="highlight">Burst</span> is higher order module that creates sophisticated visual effects for you, in any part of the screen you want. You can think of <span className="highlight">Burst</span> as particle emmiter that composes bunch of <span className="highlight">ShapeSwirl</span>s together, creating a circle of such by default.
          </p>

          <p>
            That's how it looks like:
          </p>

          <CodeSample pen="19099317e0137756f414ed3a043f85ae">
            {
              { js: `const burst = new mojs.Burst();` }
            }
          </CodeSample>

          <p>
            Just like with <span className="highlight">Shape</span>, mojs takes care about all bootstrapping work, creating as little container as possible and positioning the effect for you.
          </p>

          <p>
            In fact, from the technical point of view, <span className="highlight">Burst</span> is just a main <span className="highlight">ShapeSwirl</span> that holds bunch of child <span className="highlight">ShapeSwirl</span>s. This allows you to controls either of them. Pictorily it will look like this:
          </p>

          <p>
            [image with main swirl and child swirls]
          </p>

          <p>
            The main swirl has no <span className="highlight">shape</span> nor any presentation properties and in fact is <span className="highlight">0</span> size, this helps to mittigate user's interaction errors regarding the effect.
          </p>

          <p>
            Another important note is that <span className="highlight">radius</span> property (and <span className="highlight">radiusX</span>/<span className="highlight">radiusY</span> ones) has different meaning - it controls the radius of radial shape of particles:
          </p>

          <CodeSample pen="643c0d3499e331934e95e80ffe2e323c">
            {
              { js: `const burst = new mojs.Burst({ radius: { 0: 100 } });` }
            }
          </CodeSample>

          <p>
            There is few more properties that <span className="highlight">Burst</span> implements over <span className="highlight">Shape</span> swirl to control particles radial shape behaviour. The first one is the <span className="highlight">count</span> property that controls amount of particles:
          </p>

          <CodeSample pen="fe6f9d1476aae148f1cfb36f599c92ff">
            {
              { js: `const burst = new mojs.Burst({
  radius:   { 0: 100 },
  count:    3
});` }
            }
          </CodeSample>

          <p>
            Another important property on that matter is <span className="highlight">degree</span> one, it controls degree of the particles circle:
          </p>

          <CodeSample pen="11fadc18861a656f0a72f5e132f48f12">
            {
              { js: `const burst = new mojs.Burst({
  radius:   { 0: 100 },
  count:    5,
  degree:   30
});` }
            }
          </CodeSample>

          <p>
            That's won't be much interesting unless we can control child swirls. Right?
          </p>

          <h2> Children Options</h2>

          <p>
            You can control children options with <span className="highlight">children</span> object property:
          </p>

          <CodeSample pen="4df574c7099a40929aebaaf4af386a04">
            {
              { js: `const burst = new mojs.Burst({
  radius:   { 0: 100 },
  count:    5,
  degree:   30,
  children: {
    fill:       { 'cyan' : 'yellow' },
    duration:   2000
  }
});` }
            }
          </CodeSample>

          <p>
            I have some good news for you - I already know <span className="highlight">Burst</span> syntax! Confusing claim? Nah! I you are familiar with <span className="highlight">Shape</span> and <span className="highlight">ShapeSwirl</span> modules - you know the <span className="highlight">Burst</span>. That's because the <span className="highlight">Burst</span> is nothing than just a <span className="highlight">ShapeSwirl</span> that holds child <span className="highlight">ShapeSwirl</span>s, remember? This means you can put any property of <span className="highlight">ShapeSwirl</span> to the <span className="highlight">children</span> object, go try:
          </p>

          <CodeSample pen="64f13b396761ceabeb6e2967472acfa2">
            {
              { js: `const burst = new mojs.Burst({
  radius:   { 0: 100 },
  count:    5,
  children: {
    shape:      'polygon',
    fill:       { 'cyan' : 'yellow' },
    radius:     20,
    angle:      { 360: 0 },
    duration:   2000
  }
});` }
            }
          </CodeSample>

          <p>
            Actually <span className="highlight">Burst</span> gives you even more control over each child, allowing you to specify explicit property for each of them. These two techniques are called <span className="highlight">Stagger Strings</span> and <span className="highlight">Property Maps</span>.
          </p>

          
          <h3>Stagger Strings</h3>

          <p>
            <span className="highlight">Stagger Strings</span> was designed to express continious numeric values with some defined step (see delay property on children):
          </p>

          <CodeSample pen="3610a7d0e0ab283acf8d42f3a4b6b9a9">
            {
              { js: `const burst = new mojs.Burst({
  radius:   { 0: 100 },
  count:    10,
  children: {
    shape:      'polygon',
    points:     5,
    fill:       { 'cyan' : 'yellow' },
    angle:      { 360: 0 },
    duration:   2000,
    delay:      'stagger(0, 100)'
  }
});` }
            }
          </CodeSample>

          <p>
            The first parameter in <span className="highlight">stagger</span> function is <span className="highlight">start</span> value, all subsequent steps will be added to that base value. It is optional tho and can be ommited.
          </p>

          <p>
            In the demo above, that's exact the same circe, but we have <span className="highlight">stagger</span>ed <span className="highlight">delay</span> property, so it looks rather spiral now.
          </p>

          <p>
            Every numeric value can be expressed with stagger stings and alos they can contain <span className="highlight">rand</span>oms (see the delay property in children):
          </p>

          <CodeSample pen="05ff77cfc49e2d5f82363d90339a24e1">
            {
              { js: `const burst = new mojs.Burst({
  radius:   { 0: 100 },
  count:    10,
  children: {
    shape:      'polygon',
    points:     5,
    fill:       { 'cyan' : 'yellow' },
    angle:      { 360: 0 },
    duration:   2000,
    delay:      'stagger( rand(0, 100) )'
  }
});` }
            }
          </CodeSample>

          <p>
            We have staggered the delay with random function in period of 0 to 100.
          </p>


          <h3>Property Maps</h3>

          <p>
            Property Map was designed to express sequential values. You can use it to generate values that repeat over and over at children length. Basically it is just an array that maps its values to children regarding child index with <span className="highlight">mod</span> function. So if you have <span className="highlight">property map</span> with <span className="highlight">3 values</span> and <span className="highlight">5 children</span>, then <span className="highlight">4</span>th and <span className="highlight">5</span>th item will recieve <span className="highlight">0</span>th and <span className="highlight">0</span>st values from the map respecively:
          </p>

          <CodeSample pen="c3c518a84fea019d715cad07e87c29bf">
            {
              { js: `const burst = new mojs.Burst({
  radius:   { 0: 100 },
  count:    5,
  children: {
    shape:        'circle',
    radius:       20,
    fill:         [ 'deeppink', 'cyan', 'yellow' ],
    strokeWidth:  5,
    duration:     2000
  }
});` }
            }
          </CodeSample>

          <p>
            So starting from 12 o'clock clockwise children fill property gets values of <span className="highlight">deeppink</span>, <span className="highlight">cyan</span>, <span className="highlight">yellow</span> and then again starting from the start of property map - <span className="highlight">deeppink</span>, <span className="highlight">cyan</span>.
          </p>

          <p>
            Property maps work with any property and property form, in fact that's just a prism(or multiplexer) that feeds children with properties by virtue of modulus function. Good aid if you want to set some property explicitly.
          </p>

          <h2> Small Recap </h2>

          <p></p>

          <h2> Use Cases </h2>

          <p>
            <span className="highlight">Burst</span>, the same as <span className="highlight">Shape</span> or <span className="highlight">ShapeSwirl</span> has numerous application fields, among which are motion graphics, animation or UI. In contrary to <UniteLink link="/tutorials/shape/"> Shape&ShapeSwirl </UniteLink> tutorial, I won't split use cases to different entities but rather will try to do lot's of small demos with comments.
          </p>

          <p>
            So you can generate numerous effects with <span className="highlight">Burst</span>. Consider the next demo it uses lots of them:
          </p>

          <Pen pen="ogOYJj" height="500" />

          <em>
            Note that the demo was made a while ago so it contains depreacated syntax.
          </em>

          <p>
            How many burst have you noticed in the demo? There aree quite some actually. I think the most noticeable are collisions with the ground (click to see):
          </p>

          <Pen pen="4fe37a79f6d665d749ebcb4f22c2ee4e" height="500" />

          <p>
            This one is rather obvious, <span className="highlight">degree</span> of <span className="highlight">180</span>, <span className="highlight">radius</span> of <span className="highlight">7</span> etc.
          </p>

          <p>
            There is another one:
          </p>

          <Pen pen="953926af8c30d3dd297070b1a079e059" height="500" />

          <p>
            This one is simple too, good for practice basics. Did you notice those meteors on the left of the letters? Those are <span className="highlight">Burst</span> too. How? Well first you have a burst with 3 children:
          </p>


          <Pen pen="1018219ace50f564f7bb8b77b53efeb8" height="500" />

          <p>
            Then you set <span className="highlight">degree</span> of <span className="highlight">0</span> so they all will fly to the same direction:
          </p>

          <Pen pen="d84370a3c19fdcea8c714e7049c9ab5d" height="500" />

          <p>
            Hm, they kind of overlap, so lets add shift them by staggering <span className="highlight">left</span> and <span className="highlight">top</span> properties, after that lets add some delay property map:
          </p>

          <Pen pen="2be25259bdd8e01f9ac3770f6f2bd36a" height="500" />

          <p>
            Do you see that? Almost there. The last touch is to rotate the main swirl:
          </p>


          <Pen pen="bf8377efd5b0dada9537481e29ecd6af" height="500" />

          <p>
            Pretty yummy. What else we have got there? Letters! That's how O letter was made:
          </p>

          <Pen pen="432464f276fe6f06b457915ca6062723" height="500" />

          <p>
            As you can see main swirl's <span className="highlight">radius</span> and <span className="highlight">degree</span> of <span className="highlight">0</span> put the shapes in one point. Then we just have to slightly stagger <span className="highlight">delay</span> on children. The same for other parts - two lines:
          </p>

          <Pen pen="33f7924ecd146d951698bf190ac7838e" height="500" />

          <p>
            Catching up? I believe so. Let's refactor it a bit, and make the vertical line start from the bottom, like firework:
          </p>


          <Pen pen="a3c64825683dddd18316f8f288475131" height="500" />

          <p>
            That's better.
          </p>





      </div>
    }

    const className = (this.state.isShow) ? 'is-show' : '';
    const classNameLoading = (this.state.isShow) ? 'is-hide' : '';
    return  <Resizable className="post" onResize={this._onResize} id="post">
              <div className={`post__loading ${classNameLoading}`}> Loading The Post.. </div>
              <div className={`post__content ${className}`}>{content}</div>
            </Resizable>;
  }
});

export default ShapePage;