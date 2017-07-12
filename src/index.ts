import { interfaces, Scan, inversifyInterfaces, Registry } from '@gabliam/core';
import { Connection } from './typeorm';
import { TYPE, ENTITIES_PATH } from './constant';
import { TypeormRegistry } from './interface';

export * from './typeorm';
export * from './constant';

@Scan(__dirname)
export default class PluginsTypeOrm implements interfaces.GabliamPlugin {
  bind(container: inversifyInterfaces.Container, registry: Registry) {
    const entitiesPaths = registry
      .get<TypeormRegistry>(TYPE.Entity)
      .map(({ target }) => {
        return target;
      });
    container.bind<any>(ENTITIES_PATH).toConstantValue(entitiesPaths);
  }

  async destroy(container: inversifyInterfaces.Container, registry: Registry) {
    const connection = container.get<Connection>(Connection);
    await connection.close();
  }
}
