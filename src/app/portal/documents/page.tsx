import { PortalPageHeader, PortalPanel } from "@/components/portal/portal-ui";
import {
  documentCategories,
  mockDocumentVault,
} from "@/lib/portal/mock-data";

export default function PortalDocumentsPage() {
  return (
    <div className="space-y-8">
      <PortalPageHeader
        title="Document Vault"
        description="Secure repository for licensing, policies, reporting, and exam readiness materials. Upload functionality coming in a future release."
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          <input
            type="search"
            placeholder="Search documents…"
            disabled
            className="w-full rounded-xl border border-white/10 bg-[#101010] px-4 py-2.5 text-sm text-zinc-400 placeholder:text-zinc-600 sm:max-w-xs"
            aria-label="Search documents (coming soon)"
          />
          <select
            disabled
            className="rounded-xl border border-white/10 bg-[#101010] px-4 py-2.5 text-sm text-zinc-500 sm:max-w-[220px]"
            aria-label="Filter by category (coming soon)"
          >
            <option>All categories</option>
            {documentCategories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </div>
        <button
          type="button"
          disabled
          className="rounded-full border border-white/10 bg-[#141414] px-5 py-2.5 text-sm text-zinc-500"
        >
          Upload document (coming soon)
        </button>
      </div>

      {documentCategories.map((category) => {
        const docs = mockDocumentVault.filter((d) => d.category === category);
        if (docs.length === 0) return null;

        return (
          <PortalPanel key={category} title={category}>
            <ul className="divide-y divide-white/5">
              {docs.map((doc) => (
                <li
                  key={doc.id}
                  className="flex flex-col gap-1 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-zinc-200">
                      {doc.name}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                      Updated {doc.updatedAt} · {doc.uploadedBy}
                    </p>
                  </div>
                  <span className="text-xs text-zinc-600">
                    Secure access only
                  </span>
                </li>
              ))}
            </ul>
          </PortalPanel>
        );
      })}
    </div>
  );
}
