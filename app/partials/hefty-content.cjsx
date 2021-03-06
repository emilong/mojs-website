React     = require 'react'
Resizable = require 'react-component-resizable'
Tappable  = require 'react-tappable'
Hammer    = require 'hammerjs'

require 'css/partials/hefty-content'

module.exports = React.createClass
  componentDidMount:->
    @_body = (new Hammer document.body); @_body.on 'tap', @_handleBodyTap
  componentWillUnmount:-> @_body.off 'tap', @_handleBodyTap

  _handleBodyTap:(e)->
    has = e.srcEvent.target.classList.contains.bind e.srcEvent.target.classList
    return if has('hefty-content__curtain') or has('hefty-content__curtain-label')
    @_onHide(e)
    true
  
  getInitialState:-> {isShow: true}

  _onShow:(e)->
    e?.stopPropagation?(); e?.preventDefault?();
    return if @_isShow; @_isShow = true
    @_hideCurtain()
    # @props.onShow?()

  _onHide:(e)->
    e?.preventDefault?(); e?.stopPropagation?()
    return if !@_isShow; @_isShow = false
    @_showCurtain()
    # @props.onHide?()

  _hideCurtain:()->
    @_curtainEl ?= @refs.curtain.getDOMNode()
    @_mainEl    ?= @getDOMNode()
    @_curtainHideTween ?= new mojs.Tween
      duration: 250
      easing:   'cubic.out'
      onUpdate: (p)=> @_curtainEl.style.opacity = 1-p
      onComplete: => @_curtainEl.style.display = 'none'; @props.onShow?()
    @_curtainShowTween?.stop()
    @_curtainHideTween.play()

  _showCurtain:()->
    @_curtainEl ?= @refs.curtain.getDOMNode()
    @_mainEl    ?= @getDOMNode()
    @_curtainShowTween ?= new mojs.Tween
      duration: 250
      easing:   'cubic.in'
      onStart: => @_curtainEl.style.display = 'block'
      onUpdate:(p)=> @_curtainEl.style.opacity = p
      onComplete: => @_curtainEl.style.opacity = 1; @props.onHide?()
    @_curtainHideTween?.stop()
    @_curtainShowTween.play()

  render:->
    p = @props
    visibility = if !@state.isShow then 'hidden' else 'visible'

    children = if @_isShow then p.children else null

    style =
      opacity:    if !@state.isShow then 0 else 1
      visibility: if @props.isVisibilityToggle then visibility else null
      cursor:     'default'

    minHeight = if p.minHeight? then "#{p.minHeight}px" else 'none'
    minWidth = if p.minWidth? then "#{p.minWidth}px" else 'none'

    <div  className = "hefty-content #{@props.className or ''}"
          style     = style
          onTap     = { @_onHide } >
      
      <div
        className = "hefty-content__inner"
        onTap     = { @_onHide }
        style     = { cursor: 'default', minHeight: minHeight, minWidth: minWidth } >

        <Tappable className="hefty-content__curtain" ref="curtain" style = { display: 'block', minHeight: minHeight } onTap = {@_onShow} stopPropagation = {true}>
          <div className="hefty-content__curtain-label">
            {@props.label || 'tap to see'}
          </div>
        </Tappable>

        {children}

      </div>

    </div>
