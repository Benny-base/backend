
const Menus = require('../models/menus');
const MenusRoutes = require('../models/menus_routes');
const Seq = require('sequelize')
const _ = require('lodash')

exports.getMenusRoutes = async() => {
    Menus.hasMany(MenusRoutes, { foreignKey: 'menus_id' })
    const list = await Menus.findAll({ 
        // where: { id: 3 },
        order: [['sort','asc'], [[Seq.col('menus_routes.sort'), 'asc']]],
        raw: true, 
        include: [
            {
                model: MenusRoutes,
                attributes:[ 
                    [Seq.col('key'), 'key'],
                    [Seq.col('label'), 'label'],
                    [Seq.col('component'), 'component'],
                ],
                // where: { menus_id: 3 },
                require: true
            }
        ],
        attributes: ['key', 'label', 'component']
    })
    console.log(list)
    const routes = []
    _.forIn(_.groupBy(list, 'key'), (val, key) => {
        routes.push({
            path: key,
            label: val[0].label,
            component: val[0].component,
            routes: val[0]['menus_routes.key'] ? val.map(t => ({
                label: t['menus_routes.label'],
                path: t['menus_routes.key'],
                component: t['menus_routes.component'],
            })) : undefined
        })
    })

    return routes
}