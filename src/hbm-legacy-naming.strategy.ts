import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';

// implements the NamingStrategy with a hibernate legacy naming strategy
// this strategy is called 'legacy-hbm' as property when configuring the hibernate session factory
// the implicit hibernate naming strategy translates camelcase property names to all lower case on the DB
// tested with a database schema on postgreSQL from a legacy Java program that has been migrated to typeORM
//
// todo: implement strategy below from copied snakeCase code
// check Java implementation of hbm legcy naming strategy implementation
//
export class HbmLegacyNamingStrategy extends DefaultNamingStrategy
  implements NamingStrategyInterface {
/*
  tableName(className: string, customName: string): string {
    return customName ? customName : snakeCase(className);
  }
 */
  columnName(
    propertyName: string,
    customName: string,
    embeddedPrefixes: string[],
  ): string {
    return (
      snakeCase(embeddedPrefixes.join('_')) +
      (customName ? customName : propertyName.toLowerCase())
    );
  }

  relationName(propertyName: string): string {
    return snakeCase(propertyName);
  }

  // todo : naming strategy implemenation according to legacy hbm?
  joinColumnName(relationName: string, referencedColumnName: string): string {
    return snakeCase(relationName + '_' + referencedColumnName);
  }

  joinTableName(
    firstTableName: string,
    secondTableName: string,
    firstPropertyName: string,
    secondPropertyName: string,
  ): string {
    return snakeCase(
      firstTableName +
        '_' +
        firstPropertyName.replace(/\./gi, '_') +
        '_' +
        secondTableName,
    );
  }

  joinTableColumnName(
    tableName: string,
    propertyName: string,
    columnName?: string,
  ): string {
    return snakeCase(
      tableName + '_' + (columnName ? columnName : propertyName),
    );
  }

  classTableInheritanceParentColumnName(
    parentTableName: any,
    parentTableIdPropertyName: any,
  ): string {
    return snakeCase(parentTableName + '_' + parentTableIdPropertyName);
  }

  eagerJoinRelationAlias(alias: string, propertyPath: string): string {
    return alias + '__' + propertyPath.replace('.', '_');
  }
}
