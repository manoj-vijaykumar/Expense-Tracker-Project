import type { FormProps } from 'antd';
import { Button, Form, Input, InputNumber, Select, DatePicker } from 'antd';
import { CalendarDays, PoundSterling, Tag, FileText } from 'lucide-react';
import dayjs from 'dayjs';

type ExpenseFormProps = {
  addExpense: (options: {
    variables: {
      description: string;
      category: string;
      amount: number;
      date: string;
    };
  }) => void;
};

type FieldType = {
  description: string;
  category: string;
  amount: number;
  date: dayjs.Dayjs;
};

const ExpenseForm = ({ addExpense }: ExpenseFormProps) => {
  const [form] = Form.useForm<FieldType>();

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    addExpense({
      variables: {
        description: values.description,
        category: values.category,
        amount: Number(values.amount),
        date: values.date.format('YYYY-MM-DD'),
      },
    });

    form.resetFields();
  };

  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
      {/* Header */}
      <div className="mb-7">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          <PoundSterling size={24} />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Add Expense
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Record your spending and keep your finances organised.
        </p>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        requiredMark={false}
        className="expense-form"
      >
        {/* Description */}
        <Form.Item
          label={<span className="font-medium text-gray-700">Description</span>}
          name="description"
          rules={[
            { required: true, message: 'Please enter a description.' },
          ]}
        >
          <Input
            prefix={<FileText size={17} className="mr-1 text-gray-400" />}
            placeholder="e.g. Lunch at Subway"
            size="large"
            className="!rounded-xl"
          />
        </Form.Item>

        {/* Amount */}
        <Form.Item
          label={<span className="font-medium text-gray-700">Amount (£)</span>}
          name="amount"
          rules={[
            { required: true, message: 'Please enter the amount.' },
            {
              type: 'number',
              min: 0.01,
              message: 'Amount must be greater than £0.',
            },
          ]}
        >
          <InputNumber
            prefix={<span className="text-gray-400">£</span>}
            placeholder="0.00"
            min={0.01}
            precision={2}
            step={0.01}
            size="large"
            className="!w-full !rounded-xl"
          />
        </Form.Item>

        {/* Category */}
        <Form.Item
          label={<span className="font-medium text-gray-700">Category</span>}
          name="category"
          rules={[{ required: true, message: 'Please select a category.' }]}
        >
          <Select
            size="large"
            placeholder="Choose a category"
            suffixIcon={<Tag size={16} className="text-gray-400" />}
            className="rounded-xl"
            options={[
              { value: 'Food', label: '🍔  Food & Dining' },
              { value: 'Transport', label: '🚌  Transport' },
              { value: 'Shopping', label: '🛍️  Shopping' },
              { value: 'Bills', label: '💡  Bills & Utilities' },
              { value: 'Entertainment', label: '🎬  Entertainment' },
            ]}
          />
        </Form.Item>

        {/* Date */}
        <Form.Item
          label={<span className="font-medium text-gray-700">Date</span>}
          name="date"
          initialValue={dayjs()}
          rules={[{ required: true, message: 'Please select a date.' }]}
        >
          <DatePicker
            size="large"
            format="DD MMM YYYY"
            placeholder="Select expense date"
            suffixIcon={<CalendarDays size={17} className="text-gray-400" />}
            className="!w-full !rounded-xl"
            disabledDate={(current) => current.isAfter(dayjs(), 'day')}
          />
        </Form.Item>

        {/* Submit */}
        <Form.Item className="!mb-0 !mt-6">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            className="!h-12 !rounded-xl !border-0 !bg-emerald-600 !font-semibold !shadow-sm hover:!bg-emerald-700"
          >
            + Add Expense
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ExpenseForm;