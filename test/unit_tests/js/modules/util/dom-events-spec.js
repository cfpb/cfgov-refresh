const BASE_JS_PATH = '../../../../../cfgov/unprocessed/js/';
const chai = require( 'chai' );
const expect = chai.expect;
const domEvents = require( BASE_JS_PATH + 'modules/util/dom-events' );
let input;
let clicked;

describe( 'Dom Events bindEvent', () => {
  beforeEach( () => {
    input = document.createElement( 'input' );
    input.type = 'checkbox';
    input.value = 'test-bind-event';
    clicked = false;
  } );

  it( 'should not update the var until event is triggered', () => {
    domEvents.bindEvent( input, {
      click: function() { clicked = true; }
    } );
    expect( clicked ).to.be.false;
  } );

  it( 'should not update the var if another event is triggered', () => {
    domEvents.bindEvent( input, {
      click: function() { clicked = true; }
    } );
    input.focus();
    expect( clicked ).to.be.false;
  } );

  it( 'should update the var when the event is triggered', () => {
    domEvents.bindEvent( input, {
      click: function() { clicked = true; }
    } );
    input.click();
    expect( clicked ).to.be.true;
  } );
} );
