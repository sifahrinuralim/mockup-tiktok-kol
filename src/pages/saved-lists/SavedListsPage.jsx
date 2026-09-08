/**
 * Saved Lists page — a collection of creator lists for upcoming campaigns.
 * Shows list cards, member details (remove members), creating new lists,
 * and deleting lists with confirmation.
 * Mock data lives in src/data/mockSavedLists.js.
 */

import { useEffect, useState } from 'react';
import { Bookmark, CheckCircle2, Plus, X } from 'lucide-react';

import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { EmptyState } from '@/components/ui/EmptyState';
import { SIMULATED_LOAD_DELAY_MS } from '@/constants/discovery';
import { MOCK_SAVED_LISTS } from '@/data/mockSavedLists';
import { estimateRateCardTiers } from '@/utils/talentEstimate';

import { CreateListModal } from './components/CreateListModal';
import { SavedListCard } from './components/SavedListCard';
import { SavedListDetail } from './components/SavedListDetail';

/** List grid skeleton while the simulated loading runs. */
const ListsGridSkeleton = () => (
  <div
    aria-label="Loading saved lists..."
    className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
  >
    {Array.from({ length: 6 }, (_, index) => (
      <div key={index} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="h-2 w-1/3 rounded-full bg-slate-200" />
        <div className="mt-4 h-4 w-3/4 rounded bg-slate-200" />
        <div className="mt-2 h-3 w-full rounded bg-slate-100" />
        <div className="mt-2 h-3 w-2/3 rounded bg-slate-100" />
        <div className="mt-5 h-8 w-full rounded-lg bg-slate-100" />
      </div>
    ))}
  </div>
);

/** Today's date in 'YYYY-MM-DD' format for new list metadata. */
const getTodayString = () => new Date().toISOString().slice(0, 10);

/** Recomputes a list's estimated budget from the current member list. */
const sumEstimatedBudget = (members) =>
  members.reduce((total, member) => total + estimateRateCardTiers(member)[0].min, 0);

/**
 * Main page of the Saved Lists module.
 */
export default function SavedListsPage() {
  const [lists, setLists] = useState(MOCK_SAVED_LISTS);
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [pendingMember, setPendingMember] = useState(null); // { listId, member }
  const [pendingDeleteList, setPendingDeleteList] = useState(null);

  // Simulate the initial request so the skeleton state is visibly rendered.
  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), SIMULATED_LOAD_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const selectedList = lists.find((list) => list.id === selectedId) ?? null;

  const notify = (message) => {
    setSuccessMessage(message);
    window.setTimeout(() => setSuccessMessage(''), 5000);
  };

  const handleCreate = (form) => {
    const nextId = lists.length > 0 ? Math.max(...lists.map((list) => list.id)) + 1 : 1;
    const today = getTodayString();

    const newList = {
      id: nextId,
      name: form.name,
      category: form.category,
      target: form.target,
      description: form.description || 'No description yet — add the criteria for this list.',
      tags: [],
      members: [],
      memberCount: 0,
      estimatedBudget: 0,
      createdAt: today,
      updatedAt: today,
    };

    setLists((current) => [newList, ...current]);
    notify(`List “${newList.name}” was created.`);
  };

  const handleRemoveMember = (listId, member) => {
    setLists((current) =>
      current.map((list) => {
        if (list.id !== listId) return list;

        const members = list.members.filter((item) => item.id !== member.id);
        return {
          ...list,
          members,
          memberCount: members.length,
          estimatedBudget: sumEstimatedBudget(members),
          updatedAt: getTodayString(),
        };
      }),
    );
    setPendingMember(null);
    notify(`${member.name} removed from the list.`);
  };

  const handleDeleteList = (list) => {
    setLists((current) => current.filter((item) => item.id !== list.id));
    if (selectedId === list.id) setSelectedId(null);
    setPendingDeleteList(null);
    notify(`List “${list.name}” was deleted.`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Saved Lists"
        description="Save and group your favorite creators for upcoming campaigns."
        action={
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Create New List
          </Button>
        }
      />
      {isLoading ? (
        <ListsGridSkeleton />
      ) : (
        <>
          {successMessage && (
            <div
              role="status"
              className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <p className="flex-1">{successMessage}</p>
              <button
                type="button"
                onClick={() => setSuccessMessage('')}
                className="rounded p-0.5 text-emerald-600 transition-colors hover:bg-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                aria-label="Close notification"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          )}

          {selectedList ? (
            <SavedListDetail
              list={selectedList}
              onBack={() => setSelectedId(null)}
              onRemoveMember={(member) => setPendingMember({ listId: selectedList.id, member })}
              onRequestDelete={() => setPendingDeleteList(selectedList)}
            />
          ) : (
            <section aria-labelledby="heading-lists" className="space-y-4">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <h2 id="heading-lists" className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                    <Bookmark className="h-5 w-5 text-primary-600" aria-hidden="true" />
                    Your Creator Lists
                  </h2>
                  <p className="mt-0.5 text-sm text-slate-600">
                    {lists.length} saved lists for upcoming campaigns.
                  </p>
                </div>
              </div>

              {lists.length === 0 ? (
                <Card>
                  <EmptyState
                    icon={Bookmark}
                    title="No saved lists yet"
                    description="Create your first list to group creators by your campaign needs."
                    action={
                      <Button size="sm" onClick={() => setCreateOpen(true)}>
                        <Plus className="h-4 w-4" aria-hidden="true" />
                        Create New List
                      </Button>
                    }
                  />
                </Card>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {lists.map((list, index) => (
                    <SavedListCard
                      key={list.id}
                      list={list}
                      accentIndex={index}
                      onOpen={setSelectedId}
                    />
                  ))}
                </div>
              )}
            </section>
          )}
        </>
      )}

      <CreateListModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreate}
      />

      <ConfirmDialog
        open={Boolean(pendingMember)}
        onClose={() => setPendingMember(null)}
        onConfirm={() =>
          pendingMember &&
          handleRemoveMember(pendingMember.listId, pendingMember.member)
        }
        title="Remove Creator from List"
        description={`Are you sure you want to remove ${pendingMember?.member.name ?? ''} from this list? You can always find them again in Talent Discovery.`}
        confirmText="Remove"
      />

      <ConfirmDialog
        open={Boolean(pendingDeleteList)}
        onClose={() => setPendingDeleteList(null)}
        onConfirm={() => pendingDeleteList && handleDeleteList(pendingDeleteList)}
        title="Delete List"
        description={`List “${pendingDeleteList?.name ?? ''}” and all of its members will be permanently deleted. This action cannot be undone.`}
        confirmText="Delete List"
      />
    </div>
  );
}
