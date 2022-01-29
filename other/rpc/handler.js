module.exports = function( input, okay, fail ) {
  console.log(input)
  console.log(okay)
  console.log(fail)
	let action = input.action
	if( action == "ping" ) {
		okay( "pong" );
	} else {
		fail( "Unrecognized action: " + action );
	}
}