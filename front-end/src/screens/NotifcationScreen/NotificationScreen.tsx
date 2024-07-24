import { FlatList, SafeAreaView, View } from "@gluestack-ui/themed";
import { Notification } from "@notifee/react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator, ListRenderItem } from "react-native";
import { NoticeItem } from "./NoticeItem";
import { useGetNoticeAllQuery } from "../../services/notifiService";
import * as _ from "lodash";
export default function NotificationScreen() {
    const [dataList, setDataList] = useState<Notification[]>([])
    const [currentOffset, setCurrentOffset] = useState(0);

    const { data: loadNotice, isFetching, isLoading, refetch } = useGetNoticeAllQuery({ currentOffset });
    const loadMoreItem = () => {
        setCurrentOffset(currentOffset + 6);
    };


    useEffect(() => {
        //1
        if (loadNotice?.length != 0) {
            setDataList(currentListTask => {
                const keyByObject = _.keyBy(currentListTask, 'id');
                const mergedArray = _.values(_.merge(keyByObject, _.keyBy(loadNotice, "id")))
                return mergedArray;
            })
        }
    }, [loadNotice])



    //renderItem
    const renderItem: ListRenderItem<Notification> = ({ item }) =>
        <NoticeItem item={item} navigation={navigation} />;


    if (isLoading) return <ActivityIndicator size="large" />;

    return (
        <SafeAreaView>
            <FlatList data={dataList ? dataList : []} renderItem={renderItem}
                onEndReached={loadMoreItem}
                ListFooterComponent={() => (
                    <View>{isFetching && <ActivityIndicator size="small" />}</View>
                )}
            />
        </SafeAreaView>
    )
}