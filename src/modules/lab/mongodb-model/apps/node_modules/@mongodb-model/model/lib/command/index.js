module.exports = () => ({
    MethodCommand: require('./method'),
    MigrateCommand: require('./migrate'),
    MigrationCommand: require('./migration'),
    SchemaCommand: require('./schema'),
    ModelCommand: require('./model'),
});