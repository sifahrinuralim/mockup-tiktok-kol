import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MOCK_TOP_CONTENTS } from '@/data/mockAnalytics';

/** Jumlah konten yang ditampilkan pada kartu. */
const VISIBLE_CONTENT_COUNT = 5;

/** Baris satu konten terbaik. */
const TopContentRow = ({ content }) => (
  <li className="flex items-center gap-4 px-5 py-4">
    <img
      src={content.thumbnailUrl}
      alt=""
      loading="lazy"
      className="aspect-[3/4] h-16 w-12 shrink-0 rounded-lg object-cover ring-1 ring-slate-100"
    />
    <div className="min-w-0 flex-1">
      <p className="truncate text-sm font-semibold text-slate-800" title={content.title}>
        {content.title}
      </p>
      <p className="mt-0.5 truncate text-xs text-slate-500">
        {content.talent?.name} {content.talent?.username}
      </p>
      <Badge variant="secondary" className="mt-1.5">
        {content.campaignName}
      </Badge>
    </div>
    <dl className="hidden shrink-0 text-right sm:block">
      <div>
        <dd className="text-sm font-bold text-slate-800">{content.views}</dd>
        <dt className="text-[11px] text-slate-400">views</dt>
      </div>
      <div className="mt-1.5">
        <dd className="text-sm font-semibold text-emerald-600">{content.engagementRate}</dd>
        <dt className="text-[11px] text-slate-400">ER</dt>
      </div>
    </dl>
    <div className="shrink-0 text-right text-xs text-slate-400">
      <p>{content.likes} likes</p>
      <p>{content.comments} komentar</p>
      <p className="mt-1 text-slate-500">{content.postedAt}</p>
    </div>
  </li>
);

/**
 * Daftar konten dengan performa terbaik lintas kampanye (30 hari).
 */
export const TopContentsCard = ({ contents = MOCK_TOP_CONTENTS }) => {
  const visibleContents = contents.slice(0, VISIBLE_CONTENT_COUNT);

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>Konten Terbaik</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ul role="list" className="divide-y divide-slate-100">
          {visibleContents.map((content) => (
            <TopContentRow key={content.id} content={content} />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
