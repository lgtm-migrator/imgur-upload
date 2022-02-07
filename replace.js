import upload from "./imgur.js";

/*
 * Bulk replace asset references
 */
async function findAssets() {
    const find = `worlds/${game.world.id}`;
    const replace = "tbd";
    const dryRun = true;
    if (!find || !replace) {
        console.warn("Bulk replace asset references: No value provided");
        return;
    }
    const domParser = new DOMParser();

    console.groupCollapsed("Bulk replace scenes");
    for (const scene of game.scenes) {
        if (scene.data.img?.startsWith(find)) {
            console.log(
                `${scene.name}.img: ${scene.data.img} => ${scene.data.img.replace(
                    find,
                    replace
                )}`
            );
            if (!dryRun) {
                await scene.update({ img: scene.data.img.replace(find, replace) });
            }
        }
        if (scene.data.foreground?.startsWith(find)) {
            console.log(
                `${scene.name}.foreground: ${scene.data.foreground
                } => ${scene.data.foreground.replace(find, replace)}`
            );
            if (!dryRun) {
                await scene.update({
                    img: scene.data.foreground.replace(find, replace),
                });
            }
        }
        const tokenUpdates = [];
        let shownGroup = false;
        for (const token of scene.tokens) {
            if (token.data.img?.startsWith(find)) {
                if (!shownGroup) {
                    console.groupCollapsed(`${scene.name} tokens`);
                    shownGroup = true;
                }
                console.log(
                    `${token.name}.img: ${token.data.img} => ${token.data.img.replace(
                        find,
                        replace
                    )}`
                );
                tokenUpdates.push({
                    _id: token.id,
                    img: token.data.img.replace(find, replace),
                });
            }
        }
        if (shownGroup) {
            console.groupEnd();
        }
        if (tokenUpdates.length && !dryRun) {
            await scene.updateEmbeddedDocuments("Token", tokenUpdates);
        }
        const tileUpdates = [];
        shownGroup = false;
        for (const tile of scene.tiles) {
            if (tile.data.img?.startsWith(find)) {
                if (!shownGroup) {
                    console.groupCollapsed(`${scene.name} tiles`);
                    shownGroup = true;
                }
                console.log(
                    `tile.img: ${tile.data.img} => ${tile.data.img.replace(
                        find,
                        replace
                    )}`
                );
                tileUpdates.push({
                    _id: tile.id,
                    img: tile.data.img.replace(find, replace),
                });
            }
        }
        if (shownGroup) {
            console.groupEnd();
        }
        if (tileUpdates.length && !dryRun) {
            await scene.updateEmbeddedDocuments("Tile", tileUpdates);
        }
    }
    console.groupEnd();

    console.groupCollapsed("Bulk replace actors");
    for (const actor of game.actors) {
        if (actor.data.img?.startsWith(find)) {
            console.log(
                `${actor.name}.img: ${actor.data.img} => ${actor.data.img.replace(
                    find,
                    replace
                )}`
            );
            if (!dryRun)
                await actor.update({ img: actor.data.img.replace(find, replace) });
        }
        if (actor.data.token.img?.startsWith(find)) {
            console.log(
                `${actor.data.token.name}.token.img: ${actor.data.token.img
                } => ${actor.data.token.img.replace(find, replace)}`
            );
            if (!dryRun) {
                await actor.update({
                    token: { img: actor.data.token.img.replace(find, replace) },
                });
            }
        }
        const itemUpdates = [];
        shownGroup = false;
        for (const item of actor.data.items) {
            if (item.data.img?.startsWith(find)) {
                if (!shownGroup) {
                    console.groupCollapsed(`${actor.name} tokens`);
                    shownGroup = true;
                }
                console.log(
                    `${actor.name} ${item.name} item.img: ${item.data.img
                    } => ${item.data.img.replace(find, replace)}`
                );
                itemUpdates.push({
                    _id: item.id,
                    img: item.data.img.replace(find, replace),
                });
            }
        }
        if (shownGroup) {
            console.groupEnd();
        }
        if (itemUpdates.length && !dryRun) {
            await actor.updateEmbeddedDocuments("Item", itemUpdates);
        }
        const effectUpdates = [];
        shownGroup = false;
        for (const effect of actor.data.effects) {
            if (effect.data.img?.startsWith(find)) {
                if (!shownGroup) {
                    console.groupCollapsed(`${actor.name} effects`);
                    shownGroup = true;
                }
                console.log(
                    `${actor.name} ${effect.name} effect.img: ${effect.data.img
                    } => ${effect.data.img.replace(find, replace)}`
                );
                effectUpdates.push({
                    _id: effect.id,
                    img: effect.data.img.replace(find, replace),
                });
            }
        }
        if (shownGroup) {
            console.groupEnd();
        }
        if (effectUpdates.length && !dryRun) {
            await actor.updateEmbeddedDocuments("ActiveEffect", effectUpdates);
        }
    }
    console.groupEnd();

    console.groupCollapsed("Bulk replace items");
    for (const item of game.items) {
        if (item.data.img?.startsWith(find)) {
            console.log(
                `${item.name}.img: ${item.data.img} => ${item.data.img.replace(
                    find,
                    replace
                )}`
            );
            if (!dryRun) {
                await item.update({ img: item.data.img.replace(find, replace) });
            }
        }
        const effectUpdates = [];
        shownGroup = false;
        for (const effect of item.data.effects) {
            if (effect.data.img?.startsWith(find)) {
                if (!shownGroup) {
                    console.groupCollapsed(`${item.name} effects`);
                    shownGroup = true;
                }
                console.log(
                    `${item.name} ${effect.name} effect.img: ${effect.data.img
                    } => ${effect.data.img.replace(find, replace)}`
                );
                effectUpdates.push({
                    _id: effect.id,
                    img: effect.data.img.replace(find, replace),
                });
            }
        }
        if (shownGroup) {
            console.groupEnd();
        }
        if (effectUpdates.length && !dryRun) {
            await item.updateEmbeddedDocuments("ActiveEffect", effectUpdates);
        }
    }
    console.groupEnd();

    console.groupCollapsed("Bulk replace journals");
    for (const journal of game.journal) {
        if (journal.data.img?.startsWith(find)) {
            console.log(
                `${journal.name}.img: ${journal.data.img
                } => ${journal.data.img.replace(find, replace)}`
            );
            if (!dryRun) {
                await journal.update({
                    img: journal.data.img.replace(find, replace),
                });
            }
        }
        if (journal.data.content) {
            let hasContentUpdate = false;
            const doc = domParser.parseFromString(journal.data.content, 'text/html');
            for (const link of doc.getElementsByTagName('a')) {
                if (link.href?.startsWith(find)) {
                    console.log(
                        `${journal.name}.link: ${link.href
                        } => ${link.href.replace(find, replace)}`
                    );
                    link.href.replace(find, replace);
                    hasContentUpdate = true;
                }
            }
            for (const link of doc.getElementsByTagName('img')) {
                if (link.src?.startsWith(find)) {
                    console.log(
                        `${journal.name}.img: ${link.src
                        } => ${link.src.replace(find, replace)}`
                    );
                    link.src.replace(find, replace);
                    hasContentUpdate = true;
                }
            }

            if (hasContentUpdate && !dryRun) {
                await journal.update({
                    content: doc.body.innerHTML,
                });
            }
        }
    }
    console.groupEnd();

    /* FIXME: Currently does not update source files. This should be plugged in to JE, Actor bio, & Item description updating as well as possibly updating the stylesheets linked in the manifest.
    console.groupCollapsed("Bulk replace CSS");
    const rules = [
        ...[...document.styleSheets].map(sheet => [...sheet.cssRules]).flat(), // Style sheets
        ...[...document.querySelectorAll("*")], // Elements
    ];
    for (const rule of rules) {
        [
            "backgroundImage",
            "listStyleImage",
            "borderImageSource"
        ]
            .forEach(location => {
                if (rule.style?.[location]?.match(/url\(["']?([^"']*)["']?\)/i)?.[1]?.startsWith(find)) {
                    console.log(
                        `${rule.selectorText ?? rule.tagName}.style: ${rule.style?.[location]} => ${rule.style?.[location].replace(find, replace)}`
                    );
                    rule.style[location] = rule.style?.[location].replace(find, replace);
                    rule.cssText
                    hasContentUpdate = true;
                }
            });
    }
    console.groupEnd();
    */
}
