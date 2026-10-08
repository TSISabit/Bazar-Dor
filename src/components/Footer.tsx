export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 py-6 mt-16 text-xs text-gray-600">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div>
          <span className="font-bold text-gray-800 text-sm">বাজার দর</span> — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </div>
        <div className="text-gray-500">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </div>
      </div>
    </footer>
  );
}