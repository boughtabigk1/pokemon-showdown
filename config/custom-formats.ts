/**
 * pokepuzzl base formats (D-015): cartridge-accurate baselines for puzzles.
 *
 * Why not "[Gen N] Custom Game"? Custom Game formats are `debug: true`, which makes
 * the sim report EXACT HP to both players (Battle.reportExactHP) and enables debug
 * mode. Cartridge shows a health bar (PS: pixel HP for Gens 1-6, percentages for 7+).
 * Custom Game also lifts team size / level caps and swaps in a non-cartridge
 * `trunc`, none of which we want.
 *
 * Puzzles layer their own constraints on top via custom rules, e.g.
 *   gen9pokepuzzl@@@Max Level = 50, -All Pokemon, +Pikachu
 * Team preview follows the gen default (Gen 5+) and can be toggled per puzzle
 * with `Team Preview` / `!Team Preview`.
 *
 * This file is gitignored upstream (config/*), so tracking it on our fork's
 * `pokepuzzl` branch never conflicts with upstream merges.
 */
const baseRules = ['Obtainable', 'Cancel Mod'];

function pokepuzzlFormat(gen: number): import('../sim/dex-formats').FormatData {
	const ruleset = [...baseRules];
	if (gen >= 5) ruleset.push('Team Preview');
	// Gen 1-2: keep PS's desync protection (prevents link-battle desync states the
	// sim cannot represent) but NOT HP Percentage Mod (cartridge shows pixel HP).
	if (gen <= 2) ruleset.push('Desync Clause Mod');
	return {
		name: `[Gen ${gen}] Pokepuzzl`,
		desc: `pokepuzzl cartridge baseline for Gen ${gen} singles.`,
		mod: `gen${gen}`,
		searchShow: false,
		challengeShow: false,
		tournamentShow: false,
		ruleset,
	};
}

export const Formats: import('../sim/dex-formats').FormatList = [
	{ section: 'pokepuzzl' },
	...[9, 8, 7, 6, 5, 4, 3, 2, 1].map(pokepuzzlFormat),
];
