import { format } from "date-fns";
import * as React from "react";
import { ScrollView, Text, View } from "react-native";
import { DataTable, PaperProvider } from "react-native-paper";

interface Probs {
  data: any[];
}

const AllReportsTable = ({ data }: Probs) => {
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([5, 10, 15, 50]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  const [items] = React.useState([...data]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <PaperProvider>
      {items.length > 0 ? (
        <ScrollView horizontal className="flex-1 w-full">
          <DataTable>
            <View className="border p-0 m-0"></View>

            <DataTable.Header>
              <Text className="w-14 font-semibold  p-1 ps-2">S.no</Text>

              <View className="border p-0 m-0"></View>

              <Text className="w-40 p-1 ps-2 font-semibold text-center ">
                Site
              </Text>

              <View className="border p-0 m-0"></View>

              <Text
                numberOfLines={10}
                style={{ flexShrink: 1 }}
                className="w-32 p-1 ps-2 font-semibold text-center"
              >
                Visit No
              </Text>

              <View className="border p-0 m-0"></View>

              <Text
                numberOfLines={10}
                style={{ flexShrink: 1 }}
                className="w-40 p-1 ps-2 font-semibold text-center"
              >
                Visit Name
              </Text>

              <View className="border p-0 m-0"></View>

              <Text
                numberOfLines={10}
                style={{ flexShrink: 1 }}
                className="w-40 p-1 ps-2 font-semibold text-center"
              >
                Visit Method
              </Text>

              <View className="border p-0 m-0"></View>

              <Text
                numberOfLines={10}
                style={{ flexShrink: 1 }}
                className="w-40 p-1 ps-2 font-semibold text-center"
              >
                Actual Visit Start Date
              </Text>

              <View className="border p-0 m-0"></View>

              <Text
                numberOfLines={10}
                style={{ flexShrink: 1 }}
                className="w-40 p-1 ps-2 font-semibold text-center"
              >
                Actual Visit End Date
              </Text>

              <View className="border p-0 m-0"></View>

              <Text
                numberOfLines={10}
                style={{ flexShrink: 1 }}
                className="w-40 p-1 ps-2 font-semibold text-center"
              >
                Submit Due
              </Text>

              <View className="border p-0 m-0"></View>

              <Text
                numberOfLines={10}
                style={{ flexShrink: 1 }}
                className="w-40 p-1 ps-2 font-semibold text-center"
              >
                Finalization Due
              </Text>

              <View className="border p-0 m-0"></View>

              <Text
                numberOfLines={10}
                style={{ flexShrink: 1 }}
                className="w-40 p-1 ps-2 font-semibold text-center"
              >
                Status
              </Text>
            </DataTable.Header>
            <View className="border p-0 m-0"></View>

            {items.slice(from, to).map((item, index) => (
              <DataTable.Row key={item._id}>
                <DataTable.Cell>
                  <Text className="w-14 p-1 ps-2 ">{index + 1}</Text>
                </DataTable.Cell>

                <View className="border p-0 m-0"></View>

                <DataTable.Cell>
                  <Text
                    numberOfLines={10}
                    style={{ flexShrink: 1 }}
                    className="w-40 p-1 ps-2"
                  >
                    {item.site}
                  </Text>
                </DataTable.Cell>

                <View className="border p-0 m-0"></View>

                <DataTable.Cell>
                  <Text
                    numberOfLines={10}
                    style={{ flexShrink: 1 }}
                    className="w-32 p-1 ps-2"
                  >
                    {item.visitNo}
                  </Text>
                </DataTable.Cell>

                <View className="border p-0 m-0"></View>

                <DataTable.Cell>
                  <Text
                    numberOfLines={10}
                    style={{ flexShrink: 1 }}
                    className="w-40 p-1 ps-2"
                  >
                    {item.visitName}
                  </Text>
                </DataTable.Cell>

                <View className="border p-0 m-0"></View>

                <DataTable.Cell>
                  <Text
                    numberOfLines={10}
                    style={{ flexShrink: 1 }}
                    className="w-40 p-1 ps-2"
                  >
                    {item.visitMethod}
                  </Text>
                </DataTable.Cell>

                <View className="border p-0 m-0"></View>

                <DataTable.Cell>
                  <Text
                    numberOfLines={10}
                    style={{ flexShrink: 1 }}
                    className="w-40 p-1 ps-2"
                  >
                    {format(item.actualVisitStartDate, "dd MMM yyyy")}
                  </Text>
                </DataTable.Cell>

                <View className="border p-0 m-0"></View>

                <DataTable.Cell>
                  <Text
                    numberOfLines={10}
                    style={{ flexShrink: 1 }}
                    className="w-40 p-1 ps-2"
                  >
                    {format(item.actualVisitEndDate, "dd MMM yyyy")}
                  </Text>
                </DataTable.Cell>

                <View className="border p-0 m-0"></View>

                <DataTable.Cell>
                  <Text
                    numberOfLines={10}
                    style={{ flexShrink: 1 }}
                    className="w-40 p-1 ps-2"
                  >
                    {format(item.submitDueDate, "dd MMM yyyy")}
                  </Text>
                </DataTable.Cell>

                <View className="border p-0 m-0"></View>

                <DataTable.Cell>
                  <Text
                    numberOfLines={10}
                    style={{ flexShrink: 1 }}
                    className="w-40 p-1 ps-2"
                  >
                    {format(item.finalizationDueDate, "dd MMM yyyy")}
                  </Text>
                </DataTable.Cell>

                <View className="border p-0 m-0"></View>

                <DataTable.Cell>
                  <Text
                    numberOfLines={10}
                    style={{ flexShrink: 1 }}
                    className="w-40 p-1 ps-2"
                  >
                    {item.status}
                  </Text>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
            <View className="border p-0 m-0"></View>

            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(items.length / itemsPerPage)}
              onPageChange={(page) => setPage(page)}
              label={`${from + 1}-${to} of ${items.length}`}
              numberOfItemsPerPageList={numberOfItemsPerPageList}
              numberOfItemsPerPage={itemsPerPage}
              onItemsPerPageChange={onItemsPerPageChange}
              showFastPaginationControls
              selectPageDropdownLabel={"Rows per page"}
            />
          </DataTable>
        </ScrollView>
      ) : (
        <ScrollView horizontal className="flex-1 w-full">
          <DataTable>
            <View className="border p-0 m-0"></View>

            <DataTable.Header>
              <Text className="w-14 font-semibold  p-1 ps-2">S.no</Text>

              <View className="border p-0 m-0"></View>

              <Text className="w-40 p-1 ps-2 font-semibold text-center ">
                Site
              </Text>

              <View className="border p-0 m-0"></View>

              <Text
                numberOfLines={10}
                style={{ flexShrink: 1 }}
                className="w-32 p-1 ps-2 font-semibold text-center"
              >
                Visit No
              </Text>

              <View className="border p-0 m-0"></View>

              <Text
                numberOfLines={10}
                style={{ flexShrink: 1 }}
                className="w-40 p-1 ps-2 font-semibold text-center"
              >
                Visit Name
              </Text>

              <View className="border p-0 m-0"></View>

              <Text
                numberOfLines={10}
                style={{ flexShrink: 1 }}
                className="w-40 p-1 ps-2 font-semibold text-center"
              >
                Visit Method
              </Text>

              <View className="border p-0 m-0"></View>

              <Text
                numberOfLines={10}
                style={{ flexShrink: 1 }}
                className="w-40 p-1 ps-2 font-semibold text-center"
              >
                Actual Visit Start Date
              </Text>

              <View className="border p-0 m-0"></View>

              <Text
                numberOfLines={10}
                style={{ flexShrink: 1 }}
                className="w-40 p-1 ps-2 font-semibold text-center"
              >
                Actual Visit End Date
              </Text>

              <View className="border p-0 m-0"></View>

              <Text
                numberOfLines={10}
                style={{ flexShrink: 1 }}
                className="w-40 p-1 ps-2 font-semibold text-center"
              >
                Submit Due
              </Text>

              <View className="border p-0 m-0"></View>

              <Text
                numberOfLines={10}
                style={{ flexShrink: 1 }}
                className="w-40 p-1 ps-2 font-semibold text-center"
              >
                Finalization Due
              </Text>

              <View className="border p-0 m-0"></View>

              <Text
                numberOfLines={10}
                style={{ flexShrink: 1 }}
                className="w-40 p-1 ps-2 font-semibold text-center"
              >
                Status
              </Text>
            </DataTable.Header>
            <View className="border p-0 m-0"></View>

            <DataTable.Row>
              <DataTable.Cell>
                <Text className="w-full p-1 ps-2 ">No data Found</Text>
              </DataTable.Cell>
            </DataTable.Row>

            <View className="border p-0 m-0"></View>
          </DataTable>
        </ScrollView>
      )}
    </PaperProvider>
  );
};

export default AllReportsTable;
