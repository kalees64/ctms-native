import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { authStore } from "../store/authStore";
import { reportStore } from "../store/reportsStore";
import Loader from "./ui/Loader";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import Octicons from "@expo/vector-icons/Octicons";
import Entypo from "@expo/vector-icons/Entypo";

const ReportViewComponent = ({ reportId }: { reportId: any }) => {
  const [user, setUser] = useState<any>();
  const [report, setReport] = useState<any>();
  const [reportSource, setReportSource] = useState<any>();
  const [openedSections, setOpenedSections] = useState<string[]>([]);

  const router = useRouter();
  const { getUserFromLocalStorage } = authStore();
  const { getReportByReportId, getReportSourceByReportId } = reportStore();

  const handleInit = async () => {
    const userData = await getUserFromLocalStorage();
    setUser(JSON.parse(userData));

    const reportData = await getReportByReportId(String(reportId));
    setReport(reportData);

    const reportSourceData = await getReportSourceByReportId(String(reportId));
    setReportSource(reportSourceData);
  };

  const addSectionForOpen = (sectionId: string) => {
    if (openedSections.includes(sectionId)) {
      setOpenedSections(
        openedSections.filter((section: any) => section !== sectionId)
      );
      return;
    }
    setOpenedSections([...openedSections, sectionId]);
  };

  useEffect(() => {
    handleInit();
  }, []);

  if (!user || !report || !reportSource) {
    return (
      <View className="flex-1">
        <View className="flex flex-row items-center justify-between">
          <Text className="font-bold text-2xl">Report View </Text>
          <MaterialCommunityIcons
            name="backburger"
            size={24}
            color="black"
            onPress={() => {
              router.back();
            }}
          />
        </View>
        <View className="mt-2 border border-black/50"></View>
        <Loader />
        <StatusBar style="light" backgroundColor="#83103e" />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <ScrollView className="flex-1">
        <View className="flex flex-row items-center justify-between">
          <Text className="font-bold text-2xl">Report View </Text>
          <MaterialCommunityIcons
            name="backburger"
            size={24}
            color="black"
            onPress={() => {
              router.back();
            }}
          />
        </View>
        <View className="mt-2 border border-black/50"></View>

        {/* Summary */}
        <View className="flex-1 pt-2">
          <Text className="font-bold text-xl">Summary</Text>

          <View className="flex-1 flex flex-row gap-2 py-2 px-1 flex-wrap">
            <View className="w-full flex flex-row items-center gap-1 ">
              <Text className="font-semibold w-5/12">Visit No : </Text>
              <Text className="w-7/12">{report.visitNo || "N/A"}</Text>
            </View>
            <View className="w-full flex flex-row items-center gap-1">
              <Text
                className="font-semibold w-5/12 flex-shrink"
                numberOfLines={10}
              >
                Site Name :{" "}
              </Text>
              <Text className="w-7/12">{report.site || "N/A"}</Text>
            </View>
            <View className="w-full flex flex-row items-center gap-1">
              <Text className="font-semibold w-5/12">Study Acronym :</Text>
              <Text className="w-7/12">
                {reportSource.projectDetails.projectAcronym || "N/A"}
              </Text>
            </View>
            <View className="w-full flex flex-row items-center gap-1">
              <Text className="font-semibold w-5/12">PI Name :</Text>
              <Text className="w-7/12">
                {reportSource.piDetails.length
                  ? reportSource.piDetails[0].firstName || "N/A"
                  : "N/A"}
              </Text>
            </View>
            <View className="w-full flex flex-row items-center gap-1">
              <Text className="font-semibold w-5/12">Study Name :</Text>
              <Text className="w-7/12">{report.projectName || "N/A"}</Text>
            </View>
            <View className="w-full flex flex-row items-center gap-1">
              <Text className="font-semibold w-5/12">CRA Name : </Text>
              <Text className="w-7/12">{report.craName || "N/A"}</Text>
            </View>
            <View className="w-full flex flex-row items-center gap-1">
              <Text className="font-semibold w-5/12">Reviewer Name :</Text>
              <Text className="w-7/12">{report.reviewerName || "N/A"}</Text>
            </View>
            <View className="w-full flex flex-row items-center gap-1">
              <Text className="font-semibold w-5/12">Submit Due Date :</Text>
              <Text className="w-7/12">{report.submitDueDate || "N/A"}</Text>
            </View>
            <View className="w-full flex flex-row items-center gap-1">
              <Text className="font-semibold w-5/12">Finalized Due Date :</Text>
              <Text className="w-7/12">
                {report.finalizationDueDate || "N/A"}
              </Text>
            </View>
          </View>
        </View>

        {/* Visit Attendees */}
        <View className="flex-1 pt-2">
          <View className="flex flex-row items-center gap-4">
            <Text className="font-bold text-xl">Visit Attendees</Text>
            <Octicons name="person-add" size={24} color="black" />
          </View>
          {report.visitAttendees ? (
            <View>
              <View className="pt-2">
                {report.visitAttendees.attendees?.map((attendee: any) => (
                  <Text key={attendee.id}>
                    {attendee.name || "Unknown Attendee"}
                  </Text>
                ))}
              </View>
              {report.visitAttendees.comments && (
                <View className="flex flex-row items-center gap-2">
                  <Text className="font-semibold">comments : </Text>
                  <Text>{report.visitAttendees.comments || "No comments"}</Text>
                </View>
              )}
            </View>
          ) : (
            <Text>No visit attendees available</Text>
          )}
        </View>

        {/* Sections List */}
        <View className="flex-1 pt-2">
          <View className="flex flex-row items-center gap-4">
            <Text className="font-bold text-xl">
              Sections List ({report.sectionData.length || 0})
            </Text>
          </View>

          {report.sectionData?.length ? (
            <View className="pt-2">
              {report.sectionData.map((section: any) => (
                <View
                  key={section._id}
                  className="my-1 p-2 bg-white/50 rounded"
                >
                  <Pressable
                    className="flex flex-row items-center justify-between"
                    onPress={() => {
                      addSectionForOpen(section._id);
                    }}
                  >
                    <Text>{section.sectionName || "Untitled Section"}</Text>
                    <Entypo name="chevron-small-down" size={20} color="black" />
                  </Pressable>

                  {openedSections.includes(section._id) && (
                    <View className="pt-2">
                      <ScrollView horizontal>
                        <View className="flex flex-row gap-2 items-center">
                          <Text className="w-10 font-semibold">S.No</Text>
                          <Text className="w-40 font-semibold">Questions</Text>
                        </View>
                      </ScrollView>
                      <View className="border border-[#f2deba] my-px"></View>
                      {section.questions?.map(
                        (question: any, index: number) => (
                          <View key={question._id}>
                            <ScrollView horizontal>
                              <View className="flex flex-row gap-2 items-center">
                                <Text className="w-10">{index + 1}</Text>
                                <Text numberOfLines={10} className="w-40">
                                  {question.questionName || "Untitled Question"}
                                </Text>
                              </View>
                            </ScrollView>
                            {question.comments && (
                              <View className="w-40 flex flex-row items-center gap-2 py-1">
                                <Text className="font-semibold">
                                  comments :{" "}
                                </Text>
                                <Text>
                                  {question.comments || "No comments"}
                                </Text>
                              </View>
                            )}
                            <View className="border border-[#f2deba] my-px"></View>
                          </View>
                        )
                      )}
                    </View>
                  )}
                </View>
              ))}
            </View>
          ) : (
            <Text>No sections available</Text>
          )}
        </View>
      </ScrollView>

      <StatusBar style="light" backgroundColor="#83103e" />
    </View>
  );
};

export default ReportViewComponent;
