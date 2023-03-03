
// Import any other script files here, e.g.:
// import * as myModule from "./mymodule.js";

runOnStartup(async runtime =>
{
	// Code to run on the loading screen.
	// Note layouts, objects etc. are not yet available.
	
	runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
});

async function OnBeforeProjectStart(runtime)
{
	// Code to run just before 'On start of layout' on
	// the first layout. Loading has finished and initial
	// instances are created and available to use here.
	
	runtime.addEventListener("tick", () => Tick(runtime));
}

function Tick(runtime)
{
	// Code to run every tick
	
	// If angle is too horizontal, make it more vertical
	// (QoL feature to keep ball from getting stuck bouncing back and forth)
	runtime.objects.Ball.getAllInstances().forEach(ball => {
		const angle = ball.behaviors.Bullet.angleOfMotion;
		const correctionWedge = 2*Math.PI / 360 * 15;
		if (angle >= 0 && angle <= correctionWedge) ball.behaviors.Bullet.angleOfMotion = correctionWedge;
		if (angle >= (Math.PI - correctionWedge) && angle <= Math.PI) ball.behaviors.Bullet.angleOfMotion = Math.PI - correctionWedge;
		if (angle >= Math.PI && angle <= (Math.PI + correctionWedge)) ball.behaviors.Bullet.angleOfMotion = Math.PI + correctionWedge;
		if (angle >= (2*Math.PI - correctionWedge) && angle <= 2 * Math.PI) ball.behaviors.Bullet.angleOfMotion = 2*Math.PI - correctionWedge;
	});
}
