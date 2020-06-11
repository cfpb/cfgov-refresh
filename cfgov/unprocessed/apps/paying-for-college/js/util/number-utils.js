/**
 * Turns a string into a number.
 * Assumes each number in the string should be preserved (unlike parseInt)
 * Assumes the first instance of a decimal point is the intended one
 * @param  {string} numberString  A string representing a number
 * @returns {number} The assumed numeric value of numberString
 */
function stringToNum( numberString ) {
  if ( typeof numberString === 'number' ) {
    return numberString;
  } else if ( typeof numberString === 'undefined' ) {
    return 0;
  } else if ( typeof numberString === 'object' ) {
    return 0;
  }
  let signMaker = 1;
  const minusPosition = numberString.indexOf( numberString.match( '-' ) );
  const digitPosition = numberString.indexOf( numberString.match( /\d/ ) );

  // If a '-' appears before the first digit, we assume numberString is negative
  if ( numberString.indexOf( numberString.match( '-' ) ) !== -1 &&
    minusPosition < digitPosition ) {
    signMaker = -1;
  }

  // Strip non-numeric values, maintaining periods
  numberString = numberString.replace( /[^0-9\.]+/g, '' );

  // Strip any periods after the first
  function replaceCommas( match, offset, full ) {
    if ( offset === full.indexOf( '.' ) ) {
      return '.';
    }
    return '';
  }
  numberString = numberString.replace( /\./g, replaceCommas );

  // Get number value of string, then multiply by signMaker and return
  return Number( numberString ) * signMaker;

}

function decimalToPercentString( number, decimalPlaces ) {
  if ( typeof decimalPlaces === 'undefined' ) decimalPlaces = 2;
  return Number( number )
    .toLocaleString( 'en-US',
      { style: 'percent',
        minimumFractionDigits: decimalPlaces } );
}

function enforceRange( n, min, max ) {
  let error = false;

  if ( typeof min === 'undefined' ) min = false;
  if ( typeof max === 'undefined' ) max = false;

  if ( max < min || typeof n !== typeof min ) {
    return false;
  }

  if ( n > max && max !== false ) {
    n = max;
    error = 'max';
  }

  if ( n < min && min !== false ) {
    n = min;
    error = 'min';
  }

  return {
    value: n,
    error: error
  };
}

export {
  enforceRange,
  stringToNum,
  decimalToPercentString
};
