export const cleanEntity: any = (data: any) => {
  let newData = {...data};
  const keystoRemove = ['_entityName', '_instanceName'];
  keystoRemove.forEach((key: any) => {
    delete newData[key];
  });
  return newData;
};
