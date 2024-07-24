import { Fab, FlatList } from '@gluestack-ui/themed';
import { FabIcon } from '@gluestack-ui/themed';
import { AddIcon } from '@gluestack-ui/themed';
import { FabLabel } from '@gluestack-ui/themed';
import {
  SafeAreaView,
} from '@gluestack-ui/themed';
import { ActivityIndicator, ListRenderItem, View } from 'react-native';
import CreateTaskModal from './CreateTaskModal';
import React, { useEffect } from 'react';

import { useState } from 'react';
import { useLoadListTaskQuery } from '../../services/taskService';
import { ItemTaskType } from '../../models/ItemTask';

import { ItemTask, } from './ItemTask/ItemTask';
import * as _ from "lodash";
import EditTaskModal from './ItemTask/EditTaskModal';
import DeleteTaskModal from './DeleteTaskModal';
import { useAppSelector } from '../../redux/store';
import { getAttributePermission } from '../../utils/jmix/security';

let itemLoop = {
  id: "",
  name: "",
  note: "",
  review: "",
  type: "",
}
let i = 0;

//GetPermission

const handle = (permission: any, itemLoop: any) => {

  let arrayPermiss = [];
  // const hello = getAttributePermission("Task_", "columnA", permission)
  for (const key of Object.keys(itemLoop)) {
    const hello = getAttributePermission("MISSION_", key, permission)
    arrayPermiss.push({ [key]: hello })
  }
  return arrayPermiss;


}


export default function TaskScreen({ navigation }: any) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isOpenModalDel, setIsOpenModalDel] = useState(false);
  const { permission } = useAppSelector(state => state.auth);
  const [dataList, setDataList] = useState<ItemTaskType[]>([])
  // const { listTask } = useAppSelector(state => state.auth);

  const [currentOffset, setCurrentOffset] = useState(0);
  const [itemSelected, setItemSelected] = useState<ItemTaskType>()
  const { data: loadTask, isFetching, isLoading, refetch } = useLoadListTaskQuery({ currentOffset });
  const loadMoreItem = () => {
    setCurrentOffset(currentOffset + 6);
  };

  useEffect(() => {
    //1
    if (loadTask?.length != 0) {
      setDataList(currentListTask => {
        const keyByObject = _.keyBy(currentListTask, 'id');
        const mergedArray = _.values(_.merge(keyByObject, _.keyBy(loadTask, "id")))
        return mergedArray;
      })
    }
  }, [loadTask])

  const handleSelectedItem = (item: ItemTaskType, type: string) => {
    setItemSelected(item);
    if (type == 'update') {
      setIsOpenModalEdit(true)
    } else (
      setIsOpenModalDel(true)
    )


  }
  const handleUpdateItemTask = (itemUpdate: ItemTaskType) => {
    let updateList = dataList.map(item => item.id == itemUpdate.id ? { ...item, ...itemUpdate } : item)
    setDataList(updateList);
  }
  const handleDeleteItem = () => {
    let dataAfterDel = dataList.filter(item => item.id !== itemSelected?.id)
    setDataList(dataAfterDel)
  }

  //renderItem
  const renderItem: ListRenderItem<ItemTaskType> = ({ item }) => <ItemTask item={item}
    onSelected={handleSelectedItem}
    permission={handle(permission, itemLoop)}
    itemLoop={itemLoop}
    navigation={navigation} />;


  if (isLoading) return <ActivityIndicator size="large" />;

  return (
    <SafeAreaView style={styles.container}>
      <CreateTaskModal
        isOpen={isOpenModal}
        addListTask={(itemTask: any) => setDataList([itemTask, ...dataList])}
        onClose={() => setIsOpenModal(false)}
      />
      {/* {isOpenModalEdit ? <EditTaskModal
        isOpen={isOpenModalEdit}
        updateTaskItem={handleUpdateItemTask}
        onClose={() => setIsOpenModalEdit(false)}
        itemSelected={itemSelected}
        permission={handle(permission, itemLoop)}
        itemLoop={itemLoop}
      /> : null} */}
      {isOpenModalDel ? <DeleteTaskModal
        isOpen={isOpenModalDel}
        onClose={() => setIsOpenModalDel(false)}
        itemSelected={itemSelected}
        onSave={handleDeleteItem}
      /> : null
      }
      <FlatList data={dataList ? dataList : []} renderItem={renderItem}
        onEndReached={loadMoreItem}
        ListFooterComponent={() => (
          <View>{isFetching && <ActivityIndicator size="small" />}</View>
        )}
      />
      <Fab
        size="md"
        placement="bottom right"
        isHovered={false}
        isDisabled={false}
        isPressed={false}
        onPress={() => setIsOpenModal(true)}>
        <FabIcon as={AddIcon} mr="$1" />
        <FabLabel>Task</FabLabel>
      </Fab>
    </SafeAreaView >
  );
}
const styles = {
  container: { flex: 1, padding: 10 },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { textAlign: 'center', fontWeight: 'bold' },
  dataWrapper: { marginTop: -1 },
};
