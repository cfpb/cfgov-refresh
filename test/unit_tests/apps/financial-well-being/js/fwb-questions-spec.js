const BASE_JS_PATH = '../../../../../cfgov/unprocessed/apps/';
const chai = require( 'chai' );
const expect = chai.expect;

let fwbQuestions;
let formDom;
let submitBtnDom;
let radioButtonsDom;
const dataLayerEventRadio = {
  event: 'Financial Well-Being Tool Interaction',
  action: 'Questionnaire Radio Button Clicked',
  label: 'I could handle a major unexpected expense',
  eventCallback: undefined, // eslint-disable-line  no-undefined
  eventTimeout: 500
};
const dataLayerEventSubmit = {
  event: 'Financial Well-Being Tool Interaction',
  action: 'Questionnaire Submitted',
  label: 'Get my score',
  eventCallback: undefined, // eslint-disable-line  no-undefined
  eventTimeout: 500
};

const HTML_SNIPPET = `
  <form id="quiz-form"
         action="/consumer-tools/financial-well-being/results/"
         method="POST">
    <div class="block">
      <h2>Part 1: How well does this statement describe you
          or your situation?</h2>
      <div class="question-group">
        <fieldset class="o-scale" id="question_1">
          <h3 class="o-scale_header">
            I could handle a major unexpected expense
          </h3>
          <div class="answer-prefix">This statement describes me</div>
          <div class="m-form-field m-form-field__radio">
            <input class="a-radio"
                   type="radio"
                   id="question_1-completely"
                   name="question_1"
                   value="4"
                   data-gtm-action="Questionnaire Radio Button Clicked"
                   data-gtm-label="I could handle a major unexpected expense"
                   data-gtm-category="Financial Well-Being Tool Interaction">
            <label class="a-label" for="question_1-completely">
              Completely
            </label>
          </div>
          <div class="m-form-field m-form-field__radio">
            <input class="a-radio"
                   type="radio"
                   id="question_1-very-well"
                   name="question_1"
                   value="3"
                   data-gtm-action="Questionnaire Radio Button Clicked"
                   data-gtm-label="I could handle a major unexpected expense"
                   data-gtm-category="Financial Well-Being Tool Interaction">
            <label class="a-label" for="question_1-very-well">
              Very well
            </label>
          </div>
        </fieldset>
      </div>
    </div>
    <div class="block u-mb30">
      <h2>About you</h2>
      <div class="question-group">
        <fieldset class="o-form_fieldset" id="method">
          <h3 class="o-scale_header">
              Select how you completed the questionnaire.
              This changes the scoring calculation.
          </h3>
          <ul class="m-list m-list__unstyled content-l">
            <li class="content-l_col content-l_col-1-2">
              <div class="m-form-field
                          m-form-field__radio
                          m-form-field__lg-target">
                <input class="a-radio"
                       type="radio"
                       name="method"
                       id="read-self"
                       value="read-self"
                       data-gtm-action="Questionnaire Radio Button Clicked"
                       data-gtm-label="Select how you completed the
                       questionnaire: I read and answered the questions myself"
                       data-gtm-category="Financial Well-Being Tool
                       Interaction"
                       checked="">
                <label class="a-label" for="read-self">
                  I read and answered the questions myself
                </label>
              </div>
            </li>
            <li class="content-l_col content-l_col-1-2">
              <div class="m-form-field
                          m-form-field__radio
                          m-form-field__lg-target">
                <input class="a-radio"
                       type="radio"
                       name="method"
                       id="read-to-me"
                       value="read-to-me"
                       data-gtm-action="Questionnaire Radio Button Clicked"
                       data-gtm-label="Select how you completed the
                       questionnaire: I read the questions to someone else
                       and recorded their answers"
                       data-gtm-category="Financial Well-Being Tool
                       Interaction">
                <label class="a-label" for="read-to-me">
                  I read the questions to someone else
                  and recorded their answers
                </label>
              </div>
            </li>
          </ul>
        </fieldset>
      </div>
    </div>
    <div class="o-form_group">
      <input class="submit-quiz a-btn"
             id="submit-quiz"
             type="submit"
             value="Get my score"
             title="Please answer all questions to get your score"
             data-gtm-action="Questionnaire Submitted"
             data-gtm-label="Get my score"
             data-gtm-category="Financial Well-Being Tool Interaction">
    </div>
  </form>
`;

function triggerClickEvent( target ) {
  const event = document.createEvent( 'Event' );
  event.initEvent( 'click', true, true );

  return target.dispatchEvent( event );
}

function fillOutForm() {
  const radioButtons = document.querySelectorAll( '[type="radio"]' );
  [].forEach.call( radioButtons, radioElement => {
    triggerClickEvent( radioElement );
  } );
}

describe( 'fwb-questions', () => {
  beforeEach( () => {
    fwbQuestions = require(
      BASE_JS_PATH + 'financial-well-being/js/fwb-questions'
    );
    document.body.innerHTML = HTML_SNIPPET;
    window.dataLayer = [];
    window['google_tag_manager'] = {};
    formDom = document.querySelector( '#quiz-form' );
    submitBtnDom = document.querySelector( '#submit-quiz' );
    radioButtonsDom = document.querySelectorAll( '[type="radio"]' );

    /* JSDOM does not support form submission at this time
       and will throw an error. Prevent the form from submitting,
       even when the submit button is triggered. */
    formDom.addEventListener( 'submit', evt => {
      evt.preventDefault();
    } );
  } );

  it( 'submit button should have the correct state on initialization.', () => {
    fwbQuestions.init();
    expect( submitBtnDom.disabled )
      .to.equal( true );

    expect( submitBtnDom.title )
      .to.equal( 'Please answer all questions to get your score' );
  } );

  it( 'submit button shouldn’t submit the form ' +
      'unless all the questions are completed.', () => {
    fwbQuestions.init();
    const formSubmissionStatus = triggerClickEvent( submitBtnDom );
    expect( submitBtnDom.disabled ).to.equal( true );
    expect( formSubmissionStatus ).to.equal( false );
  } );

  it( 'submit button should submit the form ' +
      'if all the questions are completed before page load.', () => {
    fillOutForm();
    fwbQuestions.init();
    const formSubmissionStatus = triggerClickEvent( submitBtnDom );
    expect( submitBtnDom.disabled ).to.equal( false );
    expect( formSubmissionStatus ).to.equal( true );
  } );

  it( 'submit button should submit the form ' +
      'if all the questions are completed after page load.', () => {
    fwbQuestions.init();
    fillOutForm();
    const formSubmissionStatus = triggerClickEvent( submitBtnDom );
    expect( submitBtnDom.disabled ).to.equal( false );
    expect( formSubmissionStatus ).to.equal( true );
  } );

  it( 'should send the correct analytics ' +
      'when a radio button is clicked', () => {
    fwbQuestions.init();
    triggerClickEvent( radioButtonsDom[0] );
    expect( window.dataLayer[0] ).to.deep.equal( dataLayerEventRadio );
  } );

  it( 'should send the correct analytics ' +
      'when the submit button is clicked', () => {
    fillOutForm();
    fwbQuestions.init();
    triggerClickEvent( submitBtnDom );
    expect( window.dataLayer[0] ).to.deep.equal( dataLayerEventSubmit );
  } );
} );
