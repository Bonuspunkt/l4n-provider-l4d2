const { source } = require('l4n-query');

const modes = [{
    id: 'versus',
    name: 'Versus ',
    lobby: { minPlayers: 4, maxPlayers: 8, publicInfo: '# Left 4 Dead 2' },
    args: ['+sv_gametypes', 'versus']
}, {
    id: 'survival',
    name: 'Survival ',
    lobby: { minPlayers: 2, maxPlayers: 4, publicInfo: '# Left 4 Dead 2' },
    args: ['+sv_gametypes', 'survival']
}, {
    id: 'coop',
    name: 'Coop ',
    lobby: { minPlayers: 2, maxPlayers: 4, publicInfo: '# Left 4 Dead 2' },
    args: ['+sv_gametypes', 'coop']
}];

const getArgs = ({ lobby, port }) => {
    const { args: dynArgs } = modes.find(mode => mode.name === lobby.mode);
    return [
        '-game', 'left4dead2',
        '-console', '-usercon',
        '+hostname', lobby.name,
        '+hostport', port,
        '+map', 'c2m1_highway',
    ].concat(dynArgs);
}

module.exports = ({ workingDir }) => ({
    servers: modes.map(mode => ({
        id: `l4d2-${mode.id}`,
        lobby: {
            game: 'Left 4 Dead 2',
            mode: mode.name,
            ...mode.lobby
        },
    })),
    portRange: [27100, 27200],
    getArgs,
    getPrivateInfo: ({ ip, port }) => {
        return `# [connect to server](steam://connect/${ip}:${port})`;
    },
    command: {
        win32: 'srcds.exe',
        linux: './srcds_run',
    },
    options: {
        cwd: workingDir,
        stdio: 'inherit',
    },
    query: source,
});
