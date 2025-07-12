import { ViewPage } from "@/components/pages/view-page"

export default function QuestionView({ params }: { params: { id: string } }) {
  return <ViewPage questionId={params.id} />
}
