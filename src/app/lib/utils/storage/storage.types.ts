type StorageObjectMap = {
  'App/session': { //Représente la définition  de l'objet stocker dont la clé est App/Session
    access_token: string;
  };
};

export type StorageObjectType = 'App/session';

export type StorageObjectData<T extends StorageObjectType> = {
  type: T;
  data: StorageObjectMap[T];
};
