class Emotion
{
	constructor(name, x, y)
	{
		this.name = name;
		this.x = x;
		this.y = y;
	}

	distance(x, y)
	{
		let x2 = Math.pow(x - this.x, 2);
		let y2 = Math.pow(y - this.y, 2);
		return Math.sqrt(x2 + y2);
	}

	setPoint(point)
	{
		this.point = point;
	}

	setOpacity(point, label = point)
	{
		this.point.setAttribute({ opacity: point });
		this.point.label.setAttribute({ opacity: label });
	}
}

let emotions =
[
new Emotion("conceited", 0.18, 0.65),
new Emotion("lusting", 0.22, 0.85),
new Emotion("feeling superior", 0.32, 0.56),
new Emotion("expectant", 0.32, 0.06),
new Emotion("passionate", 0.32, 0.13),
new Emotion("aroused", 0.37, 0.92),
new Emotion("light-hearted", 0.42, 0.29),
new Emotion("convinced", 0.42, 0.42),
new Emotion("ambitious", 0.42, 0.65),
new Emotion("astonished", 0.42, 0.89),
new Emotion("enthusiastic", 0.5, 0.32),
new Emotion("adventurous", 0.48, 0.92),
new Emotion("amused", 0.55, 0.2),
new Emotion("interested", 0.64, 0.03),
new Emotion("triumphant", 0.64, 0.79),
new Emotion("excited", 0.69, 0.72),
new Emotion("determined", 0.74, 0.26),
new Emotion("courageous", 0.81, 0.59),
new Emotion("selfconfident", 0.81, 0.65),
new Emotion("delighted", 0.87, 0.36),
new Emotion("happy", 0.89, 0.16),
new Emotion("joyous", 0.94, 0.13),

new Emotion("tense", -0.02, 0.85),
new Emotion("alarmed", -0.08, 0.89),
new Emotion("bellicose", -0.11, 0.96),
new Emotion("afraid", -0.11, 0.79),
new Emotion("hostile", -0.28, 0.89),
new Emotion("envious", -0.27, 0.82),
new Emotion("enraged", -0.17, 0.72),
new Emotion("angry", -0.41, 0.79),
new Emotion("annoyed", -0.44, 0.66),
new Emotion("hateful", -0.58, 0.86),
new Emotion("defiant", -0.6, 0.72),
new Emotion("contemptuous", -0.57, 0.65),
new Emotion("distressed", -0.7, 0.56),
new Emotion("disgusted", -0.67, 0.49),
new Emotion("loathing", -0.8, 0.43),
new Emotion("frustrated", -0.6, 0.39),
new Emotion("discontented", -0.67, 0.33),
new Emotion("bitter", -0.8, 0.26),
new Emotion("insulted", -0.74, 0.2),
new Emotion("startled", -0.91, 0.03),
new Emotion("distrustful", -0.47, 0.1),
new Emotion("suspicious", -0.32, 0.26),
new Emotion("impatient", -0.04, 0.29),
new Emotion("indignant", -0.24, 0.46),
new Emotion("jealous", -0.08, 0.56),

new Emotion("disappointed", -0.80, -0.03),
new Emotion("miserable", -0.92, -0.14),
new Emotion("dissatisfied", -0.6, -0.17),
new Emotion("uncomfortable", -0.67, -0.36),
new Emotion("sad", -0.82, -0.4),
new Emotion("gloomy", -0.87, -0.46),
new Emotion("depressed", -0.81, -0.46),
new Emotion("desperate", -0.8, -0.49),
new Emotion("despondant", -0.57, -0.43),
new Emotion("ashamed", -0.44, -0.49),
new Emotion("wavering", -0.57, -0.69),
new Emotion("anxious", -0.72, -0.79),
new Emotion("dejected", -0.51, -0.86),
new Emotion("droopy", -0.32, -0.92),
new Emotion("doubtful", -0.28, -0.96),
new Emotion("tired", -0.02, -0.99),
new Emotion("bored", -0.34, -0.79),
new Emotion("hesitant", -0.31, -0.72),
new Emotion("melancholic", -0.04, -0.66),
new Emotion("embarrassed", -0.32, -0.59),
new Emotion("languid", -0.23, -0.5),
new Emotion("feel guilt", -0.4, -0.43),
new Emotion("worried", -0.08, -0.33),
new Emotion("apathetic", -0.2, -0.13),
new Emotion("taken aback", -0.4, -0.23),

new Emotion("impressed", 0.38, -0.07),
new Emotion("confident", 0.5, -0.2),
new Emotion("hopeful", 0.61, -0.3),
new Emotion("attentive", 0.48, -0.46),
new Emotion("longing", 0.22, -0.43),
new Emotion("pensive", 0.03, -0.59),
new Emotion("serious", 0.22, -0.66),
new Emotion("conscientious", 0.31, -0.79),
new Emotion("sleepy", 0.02, -0.99),
new Emotion("reverent", 0.22, -0.96),
new Emotion("compassionate", 0.38, -0.92),
new Emotion("peaceful", 0.55, -0.79),
new Emotion("polite", 0.36, -0.66),
new Emotion("contemplative", 0.58, -0.59),
new Emotion("relaxed", 0.71, -0.66),
new Emotion("satisfied", 0.77, -0.63),
new Emotion("friendly", 0.76, -0.59),
new Emotion("at ease", 0.77, -0.59),
new Emotion("content", 0.81, -0.56),
new Emotion("serene", 0.84, -0.5),
new Emotion("solemn", 0.81, -0.47),
new Emotion("glad", 0.94, -0.17),
new Emotion("amorous", 0.84, -0.14),
new Emotion("pleased", 0.88, -0.1),
new Emotion("feel well", 0.91, -0.07)
];