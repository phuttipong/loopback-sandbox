import debugModule from 'debug';

const debug = debugModule('boot:00_db_tables');


export default (app, callback) => {
  // Comment this out if you wanna let loopback create schema automatically
  // *** important ***
  // autoUpdate can not be used after add constraint manually
  // so you have to drop database first.

  debug('gonna boot datasource mysql');
  const ds = app.dataSources.mysql;
  const lbTables = app.models()
    .filter(model => model.dataSource != null && model.dataSource.settings.name === 'mysql')
    .map(model => model.modelName);
  ds.isActual(lbTables, (err, actual) => {
    if (err) throw err;
    if (!actual) {
      debug('will autoupdate db', actual);
      ds.autoupdate(lbTables, (uerr) => {
        if (uerr) throw uerr;
      });
    } else {
      callback();
    }
  });
};
